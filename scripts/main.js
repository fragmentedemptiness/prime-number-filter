(function () {
  const $div_results = document.getElementById("results");
  const $div_list = document.getElementById("list");
  const $div_templates = document.getElementById("templates");
  const $limit = Number(new URL(document.URL).searchParams.get("limit"));
  const $valid_list = [2];
  const $key_query = ($_el, $_key) => $_el.querySelector(`[data-key=${$_key}]`);
  const $get_tem = ($_key) => $key_query($div_templates, $_key).content.cloneNode(true);
  function $validate($_index) {
    const $start = Math.floor($_index / 2 - .5);
    const $end = Math.floor($limit / $_index / 2 + .5);
    const $sliced_list = $valid_list.slice($start, $end);
    $sliced_list.forEach(($_num) => delete $valid_list[($_index * $_num) / 2 - .5]);
  }
  function $filter_primes() {
    $div_results.prepend($get_tem("list-header"));
    for (let $index = 3; $index <= $limit; $index += 2) {
      $valid_list.push($index);
    }
    for (let $index = 3; $index ** 2 <= $limit; $index += 2) {
      if ($valid_list.indexOf($index) > 0) $validate($index);
    }
  }
  function $write_num($_num) {
    const $cell_frg = $get_tem("cell");
    const $span_cell = $cell_frg.firstElementChild;
    $span_cell.append($_num);
    $div_list.append($cell_frg);
  }
  if (!$limit) return;
  $filter_primes();
  $valid_list.forEach($write_num);
})();
