<template>

    <h1>Logged in!</h1>
    <div class="bigcontainer">
        <div class="container">
        <div class="box">
            <div class="content">
                <input type="text" placeholder="Enter text here">
            </div>
        </div>
    </div>
</div>
    

</template>

<script>

import {io} from 'socket.io-client'

export default {
  data() {
    return {
      chatContent: [],
      newMessage: "",
      socket: null,
      isAuthenticated: false,
    };
  },
  methods: {
    sendMessage() {
      this.socket.emit("message", this.newMessage);
      this.newMessage = "";
    },
    initSocket() {
      this.socket = io("http://localhost:3000", {
        query: {
          token: localStorage.getItem("token"),
        },
      });

      this.socket.on("connect", () => {
        console.log("connected");
      });

      this.socket.on("newMessage", (message) => {
        this.chatContent.push(message);
      });
    },
    checkAuth() {
      // Check if user is authenticated before connecting to socket
      // Make a request to backend to check if token is valid
      console.log(localStorage.getItem('token'))
      fetch("http://localhost:8080/api/check-auth", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            this.isAuthenticated = true;
            this.initSocket();
          } else {
            // Redirect user to login page if not authenticated
            this.$router.push("/login");
          }
        });
    },
  },
  mounted() {
    this.checkAuth();
  },
};


class Message {
    constructor(name, content) {
        this.name = name;
        this.age = age;
    }
}

</script>

<style scoped>
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: consolas;
}

.bigcontainer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    /*
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: -100vh
    */
    position: fixed;
    bottom: 30px;
    z-index: 999;
    display: flex;
    justify-content: center;
}

.container .box {
    position: relative;
    width: 700px;
    height: 70px;
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



.content{
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


.content .form {
    position: relative;
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.content input {
    background-color: transparent;
    width: 650px;
    font-size: 20px; 
}

input:focus {
  outline: none;
  -webkit-focus-ring-color: transparent;
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
    position:absolute;
    left: 0;
    bottom: 12px;
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
    display: inline; /*增添*/
    width: 5.5em; /*增添*/
    height: 1.3em; /*增添*/
    text-align: center; /*增添*/
    line-height: 1.3em; /*增添*/
}

.content .form .inputBox input:focus ~ div,
.content .form .inputBox input:valid ~ div
{
    transform: translateY(-20px);
    font-size: 0.9em;
    background: #444;
    color: #fff;
    padding: 2px, 2px;
    line-height: 0.3em; /*增添*/
    border-radius: 0; /*增添*/
}

.content .form .links {
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
}

.content .form .links a
{
    color: #444;
    text-decoration: none;
}

.content .form .inputBox input[type="submit"]
{
    background: #444;
    color: #fff;
    cursor: pointer;
    padding: 10px;
}

.content .form .inputBox input[type="submit"]:hover
{
    background: #333;
}

</style>