class SignupError extends Error {
  constructor() {
    super();
    this.message = '이미 존재하는 이메일입니다.';
    this.status = 400;
  }
}

class ServerError extends Error {
  constructor() {
    super();
    this.message = '서버 에러가 발생했습니다. 다시 시도해 주세요.';
    this.status = 500;
  }
}

module.exports = {
  SignupError,
  ServerError
};
