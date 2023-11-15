export type UserCB = (user: User | null, error: any) => void

// const userEmail = `admin@example.com`
// const userPassword = "admin123"
const temp = { email: 'ekonobi@gmail.com', password: '123' }
export type User = {
  email: string
  name: string
  token: string
}

export class Auth {
  user: User | null
  key: string = 'userInfo'

  error: { message: string } | null

  cb: UserCB | null = null;

  constructor() {
    
    this.user = null
    this.error = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error)
  }

  signIn(email: string, password: string) {
    

    return new Promise((resolve, reject) => {
      // if (email !== userEmail || password !== userPassword) {
        // const error = { message: "Wrong email or password" }
        // this.error = error
        // reject(error)
        // this.onUserChange(null, this.error)

        // return
      // }

      setTimeout(() => {
        this.user = {
          name: email,
          email,
          token: "dfasdfadsf.asdfasdf.afsdfasd",
        }
        window.localStorage.setItem(this.key, JSON.stringify(this.user))
        this.onUserChange(this.user)
        resolve(this.user)
      })
    })
  }
  async UpdateUser(user: string){
    window.localStorage.setItem(this.key, (user))
  }
  signOut() {
    // 
    window.localStorage.removeItem(this.key);
    this.user = null
    this.onUserChange(this.user)
  }

  resolveUser(timeout: number) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.localStorage.getItem(this.key)
        if (signedInUser) {
          this.user = JSON.parse(signedInUser)
        }
      } else {
        this.user = null
      }
      this.onUserChange(this.user)
    }, timeout)

    return this
  }
}
