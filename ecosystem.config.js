module.exports = {
  apps: [
    {
      name: 'Express App',
      script: 'index.js',
      instances: 'max',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      exec_mode: 'cluster',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],
}
