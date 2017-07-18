var timeArray = [
  { begin: 15, finish: 75, title: 'Meeting', location: 'First Meeting' },
  { begin: 285, finish: 320, title: 'Meeting', location: 'Second Meeting' },
  { begin: 270, finish: 300, title: 'Meeting', location: 'Third Meeting' },
  { begin: 305, finish: 335, title: 'Meeting', location: 'Fourth Meeting' }
]

var calendarFunction = function (times) {
  var sortedTimes = times.sort(function (x, y) {
    return x.begin - y.begin || y.finish - x.finish
  }),
  addSpace = 2

  sortedTimes.forEach(function (event, i, overlap) {
    var eventTimeBlock = addSpace * (event.finish - event.begin)
    var eventTop = addSpace * event.begin

    var previousTimeBlock = overlap[i - 1]
    var upcomingTimeBlock = overlap[i + 1]
    var newEventBlockDiv = document.createElement('div')

    event.direction = 'left'

    if (upcomingTimeBlock && event.finish > upcomingTimeBlock.begin) {
      event.overlap = true
      upcomingTimeBlock.overlap = true
    }

    if (previousTimeBlock && previousTimeBlock.direction === 'left') {
      event.direction = 'right'
    }

    event.overlap && newEventBlockDiv.setAttribute('class', 'split ' + event.direction || '')
    newEventBlockDiv.setAttribute('style', 'height:' + eventTimeBlock + 'px; top:' + eventTop + 'px')

    document.getElementById('calendar').appendChild(newEventBlockDiv)
    $(`<a><span>${event.title}</span><br><text>${event.location}</text></a>`).appendTo(newEventBlockDiv);
  })

}

calendarFunction(timeArray)
