var users = kendo.observable({
    users: []
});
var template;
var result;
$("#getUsers").click(getUsers);
$("#resetUsers").click(reset);

function getUsers() {
    let userNum = $("input").val();
    //alert(userNum);
    //users = undefined;
    $.ajax({
        url: 'https://randomuser.me/api/?results=' + userNum,
        dataType: 'json',
        success: function (data) {
            let temp = users.get("users");
            console.log(temp);
            for (let i = 0; i < userNum; i++) {
                const jsonData = data.results[i];
                temp.push({
                    firstname: jsonData.name.first,
                    lastname: jsonData.name.last,
                    email: jsonData.email,
                    picUrl: jsonData.picture.large
                });

            }

            console.log(temp);
            template = kendo.template($("#javascriptTemplate").html());
            result = template(users);
            $("#userList").html(result);
        }
    });

}

function reset() {
    users = kendo.observable({
        users: []

    });
    var template = kendo.template($("#javascriptTemplate").html());
    var result = template(users);
    $("#userList").html(result);
    console.log(users);
}
