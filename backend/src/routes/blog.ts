
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { useId } from 'hono/jsx';
import { jwt, sign ,verify } from 'hono/jwt'
import app from '../index';
import { auth } from 'hono/utils/basic-auth';
import { parse } from 'hono/utils/cookie';
import { createBloginput } from '@rahulcodegg/blog--common';
import { updateBloginput } from '@rahulcodegg/blog--common';


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    variables: {
        
            userId: string;
             jwtPayload: string;
    };
    
}>();
blogRouter.use('*', async (c, next) => {
    
    const authheader = c.req.header("authorization") || "";
    const token = authheader.split(" ")[1];
    const user= await verify(token,c.env.JWT_SECRET);
    if(user){
        c.set("jwtPayload", user.id as string);

    }
   await next();
});
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const authorId= c.get("jwtPayload");
	const body = await c.req.json();
    const result = createBloginput.safeParse(body);
    
    // If validation fails, return the error immediately
    if (!result.success) {
        return c.json({ error: result.error.errors });
    }
          const blog=await prisma.post.create({
              data: {
             title:body.title,
             content:body.content,
             published: true,
             authorId:(authorId),
             }
         });
       return c.text(blog.id);
       } );
            
blogRouter.put('/',async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
const authorId= c.get("jwtPayload");
	const body = await c.req.json();
    const result = updateBloginput.safeParse(body);
    
    // If validation fails, return the error immediately
    if (!result.success) {
        return c.json({ error: result.error.errors });
    }
    const blog=await prisma.post.update({
        where: {
            id: body.id,
        },
        data: {
            title:body.title,
            content:body.content,
            published: true,
            authorId:authorId,
            }
        });
       return c.text(blog.id);
            
        });

        blogRouter.get('/bulk', async (c) => {
            const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
        
    
            const blogs= await prisma.post.findMany();
        
            return c.json({
                blogs,
            });
        });
        
        blogRouter.get('/:id', async (c) => {
            const blogid = c.req.param("id");
            const prisma = new PrismaClient({
                datasourceUrl: c.env?.DATABASE_URL,
            }).$extends(withAccelerate());
        
            try {
                const blog = await prisma.post.findFirst({
                    where: {
                        id: blogid,
                    },
                });
        
                if (blog) {
                    return c.json({
                        blog,
                    });
                } else {
                    return c.json({
                        message: "Blog not found",
                    });
                }
            } catch (e) {
                console.error("Error fetching blog:", e);
                return c.json({
                    message: "Internal Server Error",
                });
            }
        });
        
	