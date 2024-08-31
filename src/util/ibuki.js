import { filter, debounceTime } from 'rxjs/operators'
import { Subject, BehaviorSubject } from 'rxjs'

const subject = new Subject()
const behSubject = new BehaviorSubject(0)

function emit(id, options) {
    subject.next({ id: id, data: options })
}

function filterOn(id) {
    return subject.pipe(filter((d) => d.id === id))
}

function hotEmit(id, options) {
    behSubject.next({ id: id, data: options })
}

function hotFilterOn(id) {
    return behSubject.pipe(filter((d) => d.id === id))
}

function debounceEmit(id, options) {
    subject.next({ id: id, data: options })
}

function debounceFilterOn(id, debouncePeriod) {
    return subject
        .pipe(filter((d) => d.id === id))
        .pipe(debounceTime(debouncePeriod))
}


export { emit, filterOn, hotEmit, hotFilterOn, debounceEmit, debounceFilterOn }