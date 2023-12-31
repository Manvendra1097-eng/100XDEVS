const User = {
  name: 'Manvendra',
  email: 'mav@gmail.com',
  isActive: true,
};

function createUser({ name: String, isActive: boolen }) {}

// createUser() give error
createUser({ name: 'Manvendra', isActive: false });

function createCourse(): { name: String; published: boolean } {
  return { name: 'DSA', published: true };
}
