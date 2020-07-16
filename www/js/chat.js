
$(document).on('click', '#id-pagesucchat1-back', function(e) {
    // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
    e.preventDefault();
    chatRoom.transferLocalStorageFromChatRoom()
    chatRoom.updateOneContent2DB($('#id-pagesucchat1-title').text())
    chatRoom.clearOffHTMLOfChatRoomContent()
    var temp_index = chatRoom.ChatRoom.findIndex((elem) => elem.roomId === chatRoom.OneChatRoomContent.roomId);
    // console.log("temp_index: ", temp_index)
    var temp_user = chatRoom.ChatRoom[temp_index].user.find((u) => u._id === chatRoom.CustomId[temp_index])
    // console.log("temp_user: ", temp_user)
    socket.emit('disconnect', { username: temp_user.name, 
                                roomname: chatRoom.ChatRoom[temp_index].room,
                                customId: chatRoom.CustomId[temp_index] }, (error) => {
        if (error) {
            return console.log(error)
        }
    })
});


$(document).on('click', '#id-pagesucchat1-btn1', function(e) {
    // ChatRoom: [{room: '', user: [{_id: '', name: '', avatar: ''}, {_id: '', name: '', avatar: ''}], roomId: ''}, ...]
    e.preventDefault();
    var $selectorInput = document.getElementById('id-pagesucchat1-input');
    var message = $selectorInput.value;
    var temp_index = chatRoom.ChatRoom.findIndex((elem) => elem.roomId === chatRoom.OneChatRoomContent.roomId);
    // console.log("temp_index: ", temp_index)
    var temp_user = chatRoom.ChatRoom[temp_index].user.find((u) => u._id === chatRoom.CustomId[temp_index])
    // console.log("temp_user: ", temp_user)
    if (message) {
        this.setAttribute('disabled', 'disabled')
        socket.emit('sendMsg', {username: temp_user.name, 
                                roomname: chatRoom.ChatRoom[temp_index].room, 
                                customId: chatRoom.CustomId[temp_index], 
                                message: message}, (error) => {
            this.removeAttribute('disabled')
            $selectorInput.value = '';
            $selectorInput.focus()
            if (error) return console.log(error)
            // console.log('Message was delivered successfully!')
        })
    }
})

socket.on('message', (message) => {
    // console.log("app-message: ", message)
    chatRoom.updateOneChatRoomOneByOne(message)
})

// socket.emit('join', {username, roomname})