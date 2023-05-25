let moistureReading = 0
/**
 * ******************************************************
 * 
 * ***>>> SOIL MOISTURE TESTER code <<<****
 * 
 * *******************************************************
 */
// when button [A] pressed - it will display the number reading on the microbit
input.onButtonPressed(Button.A, function () {
    // low moisture (dry)=low reading
    // high moisture(wettest)=high reading ie. max 1023
    // BUT - this is hard to read to the readings will be MAPped to low 0 to high of 100.
    moistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 0, 100)
    basic.showNumber(moistureReading)
    basic.clearScreen()
})
// Constantly test the soil moisture - and display "pot plant" image
// < 1 - DRY image
// >= 1 and <2 - MIDDLE image
// >2 and <=3 - FULLY wet image
basic.forever(function () {
    moistureReading = Math.map(pins.analogReadPin(AnalogPin.P0), 0, 1023, 0, 3)
    // if moisture reading (MR) is LESS than 1 - then soil is really DRY - so show "pot plant empty" image
    // Else
    // If MR is greater than or equal to 1 and less than 2 - then soil is middle range - so show "pot plant half full" image
    // otherwise MR is 3 - plant is completely wet and full of water - so show "pot plant FULL" image
    if (moistureReading < 1) {
        basic.showLeds(`
            # . . . #
            # # . # #
            . # . # .
            . # . # .
            . # # # .
            `)
    } else if (moistureReading >= 1 && moistureReading < 2) {
        basic.showLeds(`
            # . . . #
            # # . # #
            . # # # .
            . # # # .
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # # # #
            # # # # #
            . # # # .
            . # # # .
            . # # # .
            `)
    }
})
