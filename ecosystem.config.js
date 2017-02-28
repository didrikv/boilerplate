module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "boilerplate",
      script    : "server.js",
      env_production : {
        NODE_ENV: "production"
      }
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "deploy",
      host : "188.166.148.124",
      ref  : "origin/master",
      repo : "git@github.com:didrikv/boilerplate.git",
      path : "~/boilerplate",
      "post-deploy" : "nvm install && npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
