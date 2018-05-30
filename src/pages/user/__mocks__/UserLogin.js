const users = {
  username: "test",
  password: "123"
};

export default function submitUser(user) {
  return new Promise((resolve, reject) => {
    process.nextTick(() =>
      JSON.stringify(users) === JSON.stringify(user) ? resolve('success') : reject('error')
    );
  });
}