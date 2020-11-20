module.exports = {
  apps : [{
    name: 'Prime Locker',
    script: 'server.js',
    exec_mode: 'cluster',
    instances: -1,
    watch: true,
    max_memory_restart: '500M',
    autorestart: true,
    error_file: '/log/nodejs/pm2/err.log',
    out_file: '/log/nodejs/pm2/out.log',
    log_file: '/log/nodejs/pm2/combined.log',
    merge_logs: true,
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],
};
