import * as Koa from 'koa';
import * as Router from 'koa-router';
// import * as logger from 'koa-logger';
import * as koaBody from 'koa-body';
import * as views from 'koa-views';
import * as serve from 'koa-static';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import * as mongoose from 'mongoose';
const UserModel: mongoose.Model<any> = require('./models/User.model')
const config = require('./config').get()
mongoose.connect(config.database.url);


import * as neo4j from 'neo4j-driver';
const driver = neo4j.v1.driver("bolt://localhost", neo4j.v1.auth.basic("neo4j", "investorcenter"));
const session = driver.session()

const app = new Koa();
const publicRouter = new Router();
const appRouter = new Router();

// app.use(logger());
app.use(koaBody());
app.use(serve(__dirname + '/public')); // need to understand the typing system a little better 
app.use(views(__dirname + '/views'))

publicRouter.get('/', async (ctx) => {
  await ctx.render('index.pug')
})

publicRouter.post('/register', async (ctx) => {
  const user: mongoose.Document = new UserModel(ctx.request.body);
  await user.save()
    .then(user => {
      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      };
      ctx.status = 201;
      ctx.body = {
        user: userWithoutPassword,
      }
    }).catch(err => {
      ctx.status = 400;
      ctx.body = {
        error: err.errors,
      };
    });
});

publicRouter.post('/login', (ctx, next) => {
  return UserModel.findOne({ email: ctx.request.body.email }).exec()
    .then((user) => {      
      const isMatch = bcrypt.compareSync(ctx.request.body.password, user.password);

      if (isMatch === false) {
        ctx.status = 400;
        ctx.body = {
          error: {
            username: 'Email or password is wrong',
            password: 'Email or password is wrong',
          }
        };
        return;
      }
      const signedToken = jwt.sign({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        }
      }, config.jwt.secret, {
        algorithm: 'HS256',
        expiresIn: '1h',
        audience: 'investor-center',
      });

      ctx.status = 200;
      ctx.set('Authorization', 'Bearer '+signedToken);
      ctx.body = {
        jwt: signedToken,
      };
    })
    .catch((error) => {
      ctx.status = 400;
      ctx.body = {
        error: {
          username: 'Email or password is wrong',
          password: 'Email or password is wrong',
        }
      };
    });

});

appRouter.get('/app', async (ctx) => {
  ctx.state = {
    title: 'Investor Center',
  }

  await ctx.render('application.pug');
});

appRouter.post('/app/kcgraph', async (ctx) => {
  // const context: Array<any> = ctx.reqeust.body.context || [];
  // const mostSpecific = context[context.length - 1];
  // ...

  return session.run(`MATCH (n:BalanceSheet)-[*]->(connected) return n,connected`, {
    node: 'BalanceSheet'
  }).then(function (result) {
    result.records.forEach(function (record) {
      console.log(record);
    });
    ctx.status = 200
    ctx.body = {
      records: result.records,
    }
    session.close();
  })
  .catch(function (error) {
    ctx.status = 400
    ctx.body = {
      error: error
    }
    console.log(error);
  });
})


app.use(publicRouter.routes());
app.use(authorize)
app.use(appRouter.routes())


/*
Want to look at:
https://github.com/jshttp/on-finished/blob/master/index.js#L31:20


*/

async function authorize (ctx: Koa.Context, next: Function) {
  const tokenHeader = ctx.cookies.get('Authorization')
  if (!tokenHeader) {
    ctx.status = 403
    ctx.body = {
      error: 'Not authorized'
    };
    return;
  }
  const tokenHeaderArr = tokenHeader.split(' ');
  if (tokenHeaderArr.length != 2 || tokenHeaderArr[0] !== 'Bearer')  {
    ctx.status = 403
    ctx.body = {
      error: 'Not authorized'
    };
    return;
  }
  const token = tokenHeaderArr[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    ctx.status = 403
    ctx.body = {
      error: 'Not authorized'
    };
    return;
  }
  await next()
}

process.on('exit', function cleanup () {
  mongoose.disconnect();
  driver.close();
})


export default app;