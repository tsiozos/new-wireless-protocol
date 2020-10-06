let gotID = -1
let dat = control.createBuffer(17)
dat[0] = 0
for (let i = 0; i < 16; i++) {
    dat[i + 1] = i
}
radio.setGroup(43)
radio.setTransmitPower(7)
radio.onReceivedBuffer(function on_received_buffer(receivedBuffer: Buffer) {
    // # this executed by the RCVR
    radio.sendNumber(receivedBuffer[0])
    // # reply with the ID of the buffer
    console.log("Got buffer with ID: " + ("" + (receivedBuffer[0] + serial.NEW_LINE)))
})
// # set the number to exit the loop below
// print("RCVD confirmation for ID "+str(gotID)+serial.NEW_LINE)
radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    // # this executed by the SENDER
    
    gotID = receivedNumber
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    let tries: number;
    // # this executed by the SENDER
    
    let totretries = 0
    for (let j = 0; j < 100; j++) {
        dat[0] = j
        tries = 0
        while (gotID != dat[0]) {
            tries += 1
            totretries += 1
            radio.sendBuffer(dat)
            // print("Sent buffer with ID:"+str(dat[0])+serial.NEW_LINE)
            basic.pause(100)
        }
        console.log("OK buffer " + ("" + gotID) + "  retries:" + ("" + tries) + serial.NEW_LINE)
    }
    console.log("Total tries = " + ("" + totretries) + serial.NEW_LINE)
})
