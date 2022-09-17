# work.js

Generic parallel asyncronous workers pool

## API
```
# constructor
let work = new Work()
```

```
# add a new task to the queue
work.push( async () => {} )
```

```
# length of the task queue
work.length
```

```
# process the task queue using ${concurrency} parallel workers
# await until done
await work.process( concurrency )
```

## Usage
see [work_test.js](work_test.js) for example.

