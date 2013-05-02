function init(){
	var x = $.cookie("email");
	var y = $.cookie("pass");
	
	if ((x != null) && (y != null)){
		$.cookie("user", x);
		$.ajax({
			type: 'POST',
			url: 'http://rocky-reaches-7172.herokuapp.com/login.json', 
			data: {'email': x, 'password': y},
			success: function(data){
				if (data = "true"){
					window.location = "mappage.html";
				}
			}
		});
	}
}

function Login() {
	email=document.getElementById("emaillog").value;
	pass=document.getElementById("passwordlog").value;	
	
	var login={"email": email, "password": pass};
	$.post("http://rocky-reaches-7172.herokuapp.com/login.json", login, function(data){
		if (data = "true"){
			if (document.getElementById("rememberme").checked){
				$.cookie("email", email, {expires: 30});
				$.cookie("pass", pass, {expires: 30});			
			}
			else{
				$.cookie("user", email);
			}
			window.location = "mappage.html";
		}
		else if (data = 'false'){
			alert("incorrect login");
		}
		else{
			alert("WTF");
		}
	});
}


function remembercookie(){
	console.log("in cookie function");
}