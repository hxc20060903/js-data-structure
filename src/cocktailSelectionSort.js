function setLarge(value, index, currentLarge) {
  if (value >= currentLarge.value) {
    currentLarge.pos = index;
    currentLarge.value = value;
  }
}
function setSmall(value, index, currentSmall) {
  if (value < currentSmall.value) {
    currentSmall.pos = index;
    currentSmall.value = value;
  }
}

function setHeadTail(toHeadPos, toTailPos, shift, data) {
  const tailShift = data.length - 1 - shift;
  if (tailShift === shift) {
    return;
  }
  const set = new Set();
  set.add(toHeadPos).add(toTailPos).add(shift).add(tailShift);
  const shiftValue = data[shift];
  const tailShiftValue = data[tailShift];
  const toHeadValue = data[toHeadPos];
  const toTailValue = data[toTailPos];

  data[shift] = toHeadValue;
  data[tailShift] = toTailValue;
  set.delete(toHeadPos);
  set.delete(toTailPos);

  if (set.size === 2) {
    data[toHeadPos] = shiftValue;
    data[toTailPos] = tailShiftValue;
  } else if (set.size === 0) {
    return;
  } else {
    function fillMiddleVacancy(value) {
      if (toHeadPos !== shift && toHeadPos !== tailShift) {
        data[toHeadPos] = value;
      } else {
        data[toTailPos] = value;
      }
    }
    if (set.has(shift)) fillMiddleVacancy(shiftValue);
    else fillMiddleVacancy(tailShiftValue);
  }
}

function cocktailSelectionSort(smallToLarge, data) {
  if (data.length && data.length < 2) {
    return data;
  }
  if (!data.length) {
    throw new Error('array expected: cocktailSort(smallToLarge_bool, arr)');
  }
  let currentLarge = {
    pos: -1,
    value: -Infinity,
  };
  let currentSmall = {
    pos: -1,
    value: Infinity,
  };
  for (let shift = 0; shift < data.length - 1 - shift; shift++) {
    for (let index = shift; index < data.length - shift; index++) {
      setLarge(data[index], index, currentLarge);
      setSmall(data[index], index, currentSmall);
    }
    if (smallToLarge) {
      setHeadTail(currentSmall.pos, currentLarge.pos, shift, data);
    } else {
      setHeadTail(currentLarge.pos, currentSmall.pos, shift, data);
    }
    const tmp = currentLarge;
    currentLarge = currentSmall;
    currentSmall = tmp;
  }
  return data;
}

module.exports = cocktailSelectionSort;
