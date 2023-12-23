const zod = require('zod');

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

function validate(obj) {
  const response = schema.safeParse(obj);
  //   console.log('Response => ', response.error);
  console.log('Response => ', response);

  if (!response.success) {
    return false;
  } else {
    return true;
  }
}

validate({
  email: 'manven@gma.com',
  password: '12345678',
});
