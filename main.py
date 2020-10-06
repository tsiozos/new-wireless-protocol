gotID = -1

dat = bytearray(17)
dat[0] = 0
for i in range(16):
    dat[i+1]=i

radio.set_group(43)
radio.set_transmit_power(7)

def on_received_buffer(receivedBuffer):     ## this executed by the RCVR
    radio.send_number(receivedBuffer[0])    ## reply with the ID of the buffer
    print("Got buffer with ID: "+ str(receivedBuffer[0]+serial.NEW_LINE))
radio.on_received_buffer(on_received_buffer)

def on_received_number(receivedNumber):     ## this executed by the SENDER
    global gotID
    gotID = receivedNumber                  ## set the number to exit the loop below
    #print("RCVD confirmation for ID "+str(gotID)+serial.NEW_LINE)
radio.on_received_number(on_received_number)

def on_button_pressed_a():                  ## this executed by the SENDER
    global gotID,dat
    totretries = 0
    for j in range(100):
        dat[0] = j
        tries = 0
        while gotID != dat[0]:
            tries += 1
            totretries += 1
            radio.send_buffer(dat)
            #print("Sent buffer with ID:"+str(dat[0])+serial.NEW_LINE)
            basic.pause(100)
        print("OK buffer "+str(gotID)+ "  retries:"+str(tries)+serial.NEW_LINE)
    print("Total tries = "+str(totretries)+serial.NEW_LINE)
input.on_button_pressed(Button.A, on_button_pressed_a)
