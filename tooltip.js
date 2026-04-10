//---------------- Add hover option From task from https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
let tooltip;


document.getElementById('copiumSelectorSpan').addEventListener('mouseover', function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('span');
  //console.log(anchorElem.id);

  if (!anchorElem) return;

  // show tooltip and remember it
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
});

document.getElementById('tableToImageButton').addEventListener('mouseover', function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('button');
  //console.log(anchorElem.id);

  if (!anchorElem) return;

  // show tooltip and remember it
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
});

document.getElementById('backButton').addEventListener('mouseover', function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('button');
  //console.log(anchorElem.id);

  if (!anchorElem) return;

  // show tooltip and remember it
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
});

/*
document.getElementById('genshinWeapons').addEventListener('mouseover', function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('form');
  //console.log(anchorElem.id);

  if (!anchorElem) return;

  // show tooltip and remember it
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
});

document.getElementById('hsrWeapons').addEventListener('mouseover', function(event) {
  // important: a fast-moving mouse may "jump" right to a child on an annotated node, skipping the parent
  // so mouseover may happen on a child.

  let anchorElem = event.target.closest('form');
  //console.log(anchorElem.id);

  if (!anchorElem) return;

  // show tooltip and remember it
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
});
*/
document.onmouseout = function() {
  // it is possible that mouseout triggered, but we're still inside the element
  // (its target was inside, and it bubbled)
  // but in this case we'll have an immediate mouseover,
  // so the tooltip will be destroyed and shown again
  //
  // luckily, the "blinking" won't be visible,
  // as both events happen almost at the same time
  if (tooltip) {
	tooltip.remove();
	tooltip = false;
  }

}

/**
* Creates a tooltip textbox above the anchor element 
* @function
*/
function showTooltip(anchorElem, html) {
  let tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = html;
  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  // position the tooltip over the center of the element
  let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
	top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  return tooltipElem;
}