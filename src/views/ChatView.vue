<template>
  <div class = "tip" v-if="!isAuthenticated === true">
    <h1>Authenticating. If the situation persists, go back to login page.</h1>
  </div>
  <div class = "tip" v-if="chatContent.length === 0 && isAuthenticated === true">
    <h1>Logged in! 👏</h1>
    <h1>There's currently no content to display 🫠</h1>
    <h1>Press "Enter" to send message 😊</h1>
    <h1>Feel free to try Emoji ❤🧡💖💓</h1>
  </div>
  <div class="bigcontainer">
    <div class="container">
      <div class="box">
        <div class="content">
          <!--The input box-->
          <input v-if="loseConnection === false" type="text" placeholder="Say Something! Press enter to send. 🫰" v-model="newMessage"
            @keyup.enter="sendMessage">
            <input v-if="loseConnection === true" type="text" placeholder="Connection Lost! Is the server running?" v-model="newMessage"
            @keyup.enter="sendMessage">
        </div>
      </div>
    </div>
    <div class="chat-container">
      <!--Contains all the chat content-->
      <div v-if="loseConnection === true">
        <h1>Connection lost. Is the server running?</h1>
      </div>
      <table ref="messageTable" :class="{ blur: loseConnection }">
        <tbody>
          <tr v-for="(message, index) in chatContent" :key="index">
            <td>
              <div>
                <h2>{{ message }}</h2>
              </div>
              <hr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from "stompjs"

export default {
  data() {
    return {
      chatContent: [],
      newMessage: "",
      socket: null,
      isAuthenticated: false,
      username: null,
      loseConnection: false
    };
  },
  methods: {
    sendMessage() {
      console.log("________________________________________")
      if (this.newMessage != "") {
        this.stompClient.send("/app/message", {}, this.username + ": " + this.newMessage)
        console.log("Trying to push message:" + this.newMessage)
        this.newMessage = ""
      } else {
        alert("Please make sure the message in non-empty")
      }
    },
    initSocket() {
      const socket = new SockJS("http://localhost:8080/socketMessaging", null, { withCredentials: true })
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect({}, () => {
        console.log("connected")
        this.stompClient.subscribe("/topic/newMessage", (message) => {
          this.chatContent.push(message.body)
          console.log("Message sent successfully:" + message.body)
        });
      });
      this.stompClient.ws.onclose = () => {
        console.log("Connection closed");
        this.loseConnection = true
        // Blur the box on disconnecting
        this.stompClient.disconnect();
        this.showAlert = true;
        this.alertMessage = "You have been disconnected!";
      };
      this.stompClient.disconnect(() => {
        console.log("Disconnected from server");
        this.chatContent.push("You have been disconnected from the server");
      }, {});
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
            this.isAuthenticated = true
            this.username = localStorage.getItem('username')
            this.initSocket()
          } else {
            // Redirect user to login page if not authenticated
            this.$router.push("/")
          }
        });
    },
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    // Keep the chat content down to the bottom
    chatContent: {
      handler: function (val, oldVal) {
        this.$nextTick(() => {
          this.$refs.messageTable.scrollIntoView(false);
        })
      },
      deep: true
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: consolas;
}

.tip {
  z-index: 998
}

.bigcontainer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
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
  position: absolute;
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


table {
  table-layout: fixed;
  width: 700px;
}

td {
  text-align: left;
  width: 100%;
  height: 55px;
  word-break: break-all;
}

.chat-container {
  max-height: 70vh;
  overflow-y: auto;
}

.blur {
  filter: blur(8px);
  animation: blur-animation 0.5s;
}

@keyframes blur-animation {
  from {
    filter: blur(0px);
  }

  to {
    filter: blur(8px);
  }
}</style>