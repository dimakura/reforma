export default function defaultPageExtractor(ds) {
  const limit = getLimit(ds)
  const total = getTotalPages(ds)
  const page = getPage(ds)

  const pages = do {
    if (limit != null && total != null) {
      Math.ceil(total / limit)
    } else {
      null
    }
  }

  return {
    limit,
    total,
    page,
    pages
  }
}

// -- PRIVATE

function getLimit(ds) {
  return do {
    if (ds.params != null) {
      parseInteger(ds.params._limit)
    } else {
      null
    }
  }
}

function getTotalPages(ds) {
  return do {
    if (ds.headers != null) {
      parseInteger(ds.headers.get('X-Total-Count'))
    } else {
      null
    }
  }
}

function getPage(ds) {
  return do {
    if (ds.params != null) {
      parseInteger(ds.params._page)
    } else {
      null
    }
  }
}

function parseInteger(num) {
  num = parseInt(num, 10)

  return do {
    if (Number.isFinite(num)) {
      num
    } else {
      null
    }
  }
}
