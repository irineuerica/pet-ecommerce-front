import { api } from "src/config/api.config";
import { handleLoginProps } from "../hooks/useAuth";


export class LoginService {
  static instance: LoginService;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new LoginService();
    }

    return this.instance;
  }

  async handleLogin({email, senha}: handleLoginProps) {
    try {
      const { data } = await api.post(`/login`, {email, senha});

      return data;
    } catch (err) {
      throw err;
    }
  }

}
