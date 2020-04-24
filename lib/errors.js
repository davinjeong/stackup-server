class SignupError extends Error {
  constructor() {
    super();
    this.message = '이미 존재하는 이메일입니다.';
    this.status = 400;
  }
}

class SigninError extends Error {
  constructor() {
    super();
    this.message = '가입하지 않은 이메일이거나, 잘못된 비밀번호입니다.';
    this.status = 400;
  }
}

class AuthenticationError extends Error {
  constructor() {
    super();
    this.message = '사용자 인증에 실패했습니다.';
    this.status = 401;
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
  SigninError,
  AuthenticationError,
  ServerError
};
