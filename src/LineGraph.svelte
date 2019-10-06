<script>
  import { scaleLinear } from 'd3-scale';

  export let points = [{ x: 0, y: 0 }];
  export let yTicks = [-20, 0, 20, 40];
  export let xTicks = [1, 25, 50, 75, 100];
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

  let width = 450;
  let height = 200;

  $: xScale = scaleLinear()
    .domain([minX, maxX])
    .range([padding.left, width - padding.right]);

  $: yScale = scaleLinear()
    .domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top]);

  $: minX = points[0].x;
  $: maxX = points[points.length - 1].x;
  $: path = `M${points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
  $: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(
    0,
  )}Z`;
</script>

<style>
  .graph {
    margin: 30px;
  }

  svg {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: visible;
  }

  .tick {
    font-size: 0.725em;
    font-weight: 200;
  }

  .tick line {
    stroke: rgba(255, 255, 255, 0.5);
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #fff;
    text-anchor: start;
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
  }

  .x-axis .tick text {
    text-anchor: middle;
  }

  .path-line {
    fill: none;
    stroke: rgba(255, 255, 255, 0.75);
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2;
  }

  .path-area {
    fill: rgba(0, 100, 100, 0.2);
  }
</style>

<div class="graph" bind:clientWidth={width} bind:clientHeight={height}>
  <svg>
    <g class="axis y-axis" transform="translate(0, {padding.top})">
      {#each yTicks as tick}
        <g
          class="tick tick-{tick}"
          transform="translate(0, {yScale(tick) - padding.bottom})">
          <line x2="100%" />
          <text y="-4">{tick}{tick === 0 ? ' °C' : ''}</text>
        </g>
      {/each}
    </g>
    <path class="path-line" d={path} />
  </svg>
</div>
