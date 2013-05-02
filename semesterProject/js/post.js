function postUserInfo(){

firstname=document.getElementById("firstname").value;
lastname=document.getElementById("lastname").value;
email=document.getElementById("email").value;
password=document.getElementById("password").value;

var output={"firstname": firstname, "lastname": lastname, "email":email, "password":password};
$.post("http://rocky-reaches-7172.herokuapp.com/user.json", output);

}