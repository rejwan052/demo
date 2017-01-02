import 'jquery.scrollex'

function main() {
  const $window = $(window)
  const $body = $(document.body)
  const $sidebar = $('#sidebar')
  $body.addClass('is-loading')
  $body.scrollspy({target: '#sidebar-nav'})

  // inactive sections
  $('.section').each((index, section) => {
    const $section = $(section)
    $section.scrollex({
      mode: 'middle',
      top: '-10vh',
      bottom: '-10vh',
      initialize() {
        $section.addClass('inactive')
      },
      enter() {
        $section.removeClass('inactive')
      },
    })
  })

  // inactive features
  $('.feature').each((index, feature) => {
    const $feature = $(feature)
    $feature.scrollex({
      mode: 'middle',
      top: '-25vh',
      bottom: '-25vh',
      initialize() {
        $feature.addClass('inactive')
      },
      enter() {
        $feature.removeClass('inactive')
      },
    })
  })

  // smooth scroll
  $sidebar.find('a').each((index, el) => {
    const $el = $(el)
    $el.on('click', (event) => {
      event.preventDefault()
      const id = $el.attr('href')
      $('html, body').animate({
        scrollTop: $(id).offset().top,
      }, 750)
    })
  })

  // body ready
  $window.on('load', () => {
    setTimeout(() => {
      $body.removeClass('is-loading')
    }, 500)
  })
}


$(main)