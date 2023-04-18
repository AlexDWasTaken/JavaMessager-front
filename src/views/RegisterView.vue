<script>
import axios from 'axios'

function checkPassword(password) {
    // Length
    if (password.length < 8) {
        return 'Password has to be at least 8 letters long';
    }

    // Complexity
    const regexList = [
        /\d/, // numbers
        /[a-z]/, // lower case
        /[A-Z]/, // upper case
        /[\W_]/ // special characters
    ];
    let count = 0;
    for (let i = 0; i < regexList.length; i++) {
        if (regexList[i].test(password)) {
            count++;
        }
    }
    if (count < 3) {
        return 'Password must contain at least three types of numbers, lowercase letters, uppercase letters and special characters';
    }

    return true;
}


export default {
    data() {
        return {
            count: 1,
            username: "",
            password: "",
            failed: false,
            message: ""
        }
    },
    methods: {
        register: function () {
            let fd = new FormData();

            fd.append("username", this.username);
            fd.append("password", this.password);

            let result = checkPassword(this.password)
            if (result != true) {
                alert(result)
                return
            }

            axios.post('user/register', fd)
                .then(
                    response => {
                        const data = response.data
                        console.log(data);
                        if (data.success == false) {
                            this.message = data.message
                            this.failed = "true"
                        } else {
                            this.failed = "false"
                            const token = response.data.token
                            localStorage.setItem('token', token)
                            alert("Signed up!")
                            this.$router.push({
                                path: '/chat'
                            })
                        }
                    }
                )
                .catch(error => {
                    this.message = "Something went wrong. Please try again later."
                    this.failed = "true"
                    console.log(response)
                })
        }
    }

}
</script>

<template>
    <div class="container">
        <div class="box">
            <div class="cover"></div>
            <div class="shadow"></div>
            <div class="content">
                <div class="form">
                    <h3 class="logo">🤔</h3>
                    <h2>Register</h2>
                    <p v-if="failed">{{ message }}</p>
                    <div class="inputBox">
                        <input type="text" v-model="username" required>
                        <div>Username</div>
                    </div>
                    <div class="inputBox">
                        <input type="text" v-model="password" required>
                        <div>Password</div>
                    </div>
                    <div class="links">
                        Already have an account?<a href="/"> Sign in</a>
                    </div>
                    <div class="inputBox">
                        <input type="submit" value="register" @click="register()">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: consolas;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .box {
    position: relative;
    width: 400px;
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 25px;
    height: 100%;
    background: linear-gradient(#fff, #fff, #e3e3e3);
    filter: blur(1px);
    z-index: 1;
}

.container .box::after {
    content: '';
    position: absolute;
    top: 1;
    right: -1px;
    width: 25px;
    height: 100%;
    background: #9d9d9d;
    filter: blur(1px);
    z-index: 1;
}

.container .box .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #eee;
}

.container .box .shadow::before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(100% + 96px);
    width: 120%;
    height: 240%;
    background: linear-gradient(rgba(0, 0, 0, 0.075), transparent);
    transform: skewX(45deg);
}

.container .box .shadow::after {
    content: '';
    position: absolute;
    bottom: -200%;
    left: calc(100% + 80px);
    width: 100%;
    height: 200%;
    background: linear-gradient(rgba(0, 0, 0, 0.075), transparent);
    transform: skewX(45deg);
}

.cover {
    position: absolute;
    top: 0;
    left: -100px;
    width: 100px;
    height: 100px;
    background: #cfd1e1;
    z-index: 10;
}

.content {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(#dbdae1, #a3aaba);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1),
        15px 15px 15px rgba(0, 0, 0, 0.1),
        20px 10px 20px rgba(0, 0, 0, 0.1),
        50px 50px 80px rgba(0, 0, 0, 0.25),
        inset 3px 3px 2px #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content .form {
    position: relative;
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.logo {
    width: 70px;
    height: 70px;
    background: #444;
    color: #fff;
    font-size: 1.75em;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%
}

.content .form {
    position: relative;
    width: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.content .form h2 {
    font-size: 2em;
    color: #444;
    margin-bottom: 20px;
}

.content .form .inputBox {
    position: relative;
    width: 100%;
    margin-top: 30px;
}

.content .form .inputBox input {
    position: relative;
    width: 100%;
    padding: 10px 0 10px 5px;
    font-size: 1.25em;
    background: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 3px solid #444;
    outline: none;
}

.content .form .inputBox i {
    position: absolute;
    left: 0;
    bottom: 15px;
    font-size: 1.25em;
    color: #444;
}

.content .form .inputBox div {
    position: absolute;
    left: 0;
    padding: 10px 0 10px 0;
    font-size: 1.25em;
    pointer-events: none;
    color: #444;
    transition: 0.5s;
    display: inline;
    width: 5.5em;
    height: 1.3em;
    text-align: center;
    line-height: 1.3em;
}

.content .form .inputBox input:focus~div,
.content .form .inputBox input:valid~div {
    transform: translateY(-20px);
    font-size: 0.9em;
    background: #444;
    color: #fff;
    padding: 2px, 2px;
    line-height: 0.3em;
    border-radius: 0;
}

.content .form .links {
    font-size: smaller;
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
}

.content .form .links a {
    color: #444;
    text-decoration: none;
}

.content .form .inputBox input[type="submit"] {
    background: #444;
    color: #fff;
    cursor: pointer;
    padding: 10px;
}

.content .form .inputBox input[type="submit"]:hover {
    background: #333;
}
</style>