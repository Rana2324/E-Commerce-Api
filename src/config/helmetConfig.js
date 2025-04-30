import helmet from 'helmet';

const helmetConfig = {
  // You can customize it if needed
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'default-src': ["'self'"],
      'script-src': ["'self'", 'trusted-scripts.com'],
    },
  },
};

//exporting the helmet middleware with options
export default helmet(helmetConfig);
