const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Частный детектив Алексей Волков известен своей интуицией и неукротимым духом. Он уже много лет расследует запутанные дела, но никогда не сталкивался с чем-то столь ужасающим. Получив задание от обеспокоенной женщины найти её пропавшего брата, Алексей следует за ниточками улик, которые приводят его в старый заброшенный дом на окраине города. Там его вырубают и он просыпается в подвале вместе с остальными заложниками',
    options: [
      {
        text: 'Начать Игру',
        nextText: 2
      },
      
    ]
  },
  {
    id: 2,
    text: 'Вы открываете глаза и чувствуете резкую боль в затылке. Вокруг темно и холодно. В нос ударяет запах сырости и плесени. Ваши руки и ноги связаны, и вы слышите тихие стоны вокруг. Пытаясь адаптироваться к тьме, вы замечаете других людей в подобном состоянии. Вас окружает тьма, но вы чувствуете присутствие еще нескольких человек.',
    options: [
      {
        text: 'Осмотреться и попытаться освободиться',
        nextText: 3
      },
      {
        text: 'Попробовать поговорить с другими заложниками',
        nextText: 4
      },
      {
        text: 'Оставаться неподвижным и ждать развития событий',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'Вы начинаете ощупывать веревки, сковывающие ваши руки. Спустя некоторое время вы находите способ ослабить узлы и освобождаетесь. Теперь можно помочь остальным или попытаться найти выход.',
    options: [
      {
        text: 'Освободить остальных заложников',
        setState: { bond: true },
        nextText: 3.1
      },
      {
        text: 'Искать выход самостоятельно',
        nextText: 3.2
      }
    ]
  },
  {
    id: 3.1,
    text: 'Вы освобождаете остальных. Один из заложников отвечает: "Меня зовут Ирина. Я здесь уже несколько дней. Мы должны что-то предпринять."',
    options: [
      {
        text: 'Идти вместе и искать выход',
        nextText: 3.11
      },
      
      {
        text: 'Разделиться на группы и осмотреть дом',
        nextText: 3.12
      }
    ]
  },
  {
    id: 3.11,
    text: 'Вы идёте вместе с группой. Вдруг слышите шаги наверху. Это убийца. Нужно решить, что делать дальше.',
    options: [
      {
        text: 'Спрятаться и ждать',
        nextText: 3.15
      },
      
      {
        text: 'Попробовать атаковать убийцу',
        nextText: 3.13
      }
    ]
  },
  {
    id: 3.12,
    text: 'Вы разделяетесь и начинаете осмотр дома. Вдруг вы слышите крики и понимаете, что один из ваших спутников попался.',
    options: [
      {
        text: 'Поспешить на помощь',
        nextText: 3.14
      },
      {
        text: 'Убежать отсюда к дальнему проходу',
        nextText: 6
      }
    ]
  },
  {
    id: 3.13,
    text: 'Вы заманили убийцу и успели встать перед дверью, чтобы удержать его, в то же время остальные стояли в стороне и ждали момента. Hо убийца распахнув дверь очень сильно и вы откинулись. Вы лежите и быстро обдумываете свой следующий ход.',
    options: [
      {
        text: 'Напасть на убийцу с помощью осколка',
        requiredState: (currentState) => currentState.glass,
        nextText: 4.99
      },
      {
        text: 'Продолжить борьбу',
        nextText: 3.99
      },
      {
        text: 'Сбежать',
        nextText: 3.95
      }
    ]
  },
  {
    id: 3.14,
    text: 'Вы вернулись обратно. Вы увидели, что тот самый спутник убегает от маньяка и успел пробежать мимо двери к вам. Вы встали перед дверью, чтобы удержать убийцу пока остальные стояли в стороне и ждали момента. Hо убийца распахнув дверь очень сильно и вы откинулись. Вы лежите и быстро обдумываете свой следующий ход.',
    options: [
      {
        text: 'Напасть на убийцу с помощью осколка',
        requiredState: (currentState) => currentState.glass,
        nextText: 4.99
      },
      {
        text: 'Продолжить борьбу',
        nextText: 3.99
      },
      {
        text: 'Сбежать',
        nextText: 3.95
      }
    ]
  },
  {
    id: 3.15,
    text: 'Вы наблюдаете, удачно спрятавшись, как с особой жестокостью убийца избивает и уносит жертв за дверь, пока маньяк очередной раз забирал новую жертву вы смогли тщательно разглядеть его лицо и уже не забудете его.',
    options: [
      {
        text: 'Вонзить в спину маньяка осколок',
        requiredState: (currentState) => currentState.glass,
        nextText: 5.3
      },
      {
        text: 'Остаться и также бездействовать',
        nextText: 5.1
      },
      {
        text: 'Попытаться убежать',
        nextText: 6
      }
    ]
  },
  {
    id: 3.2,
    text: 'Вы осматриваете подвал. Находите проход с лестницей, ведущую наверх, но вас не покидает мысль о спасений заложников.',
    options: [
      {
        text: 'Вернуться и всё таки попытаться спасти заложников',
        setState: { bond: true },
        nextText: 3.50
      },
      {
        text: 'Взобраться по лестнице',
        nextText: 6
      }
    ]
  },
  {
    id: 3.50,
    text: 'Вы вернулись и освободили остальных. Однако, вы все услышали шаги маньяка и понимаете, что он приближается.',
    options: [
      {
        text: 'Спрятаться и ждать',
        nextText: 3.15
      },
      {
        text: 'Обороняться',
        nextText: 3.13
      }
    ]
  },
  {
    id: 3.99,
    text: 'Вы накинулись на убийцу, но он очень быстро и неожиданно вонзил в вас нож в область тонкой кишки, повалив вас на землю он нанес еще несколько ударов. Пока маньяк продолжал с особой жестокостью наносить удары заложники хоть и уже поздно но успели среагировать и забить маньяка всем что они нашли. Через сутки как вы пропали вас начали искать все спец службы и нашли вас и заложников вместе с обезжизненным маньяком, но уже было поздно. ВЫ ПОГИБЛИ!',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 3.95,
    text: 'Вы убегаете не оглядываяь, с трудом игнорируя крики остальных выживших, погибающих далеко позади вас',
    options: [
      {
        text: 'Подбежать к проходу с лестницей',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Ваш шепот привлекает внимание других. Один из заложников отвечает: "Меня зовут Ирина. Я здесь уже несколько дней. Мы должны что-то предпринять."',
    options: [
      {
        text: 'Согласиться и начать действовать вместе',
        setState: { glass: true, bond: true },
        nextText: 4.1
      },
      {
        text: 'Отказаться и попытаться освободиться самостоятельно',
        nextText: 3
      }
    ]
  },
  {
    id: 4.1,
    text: 'Заложники вам помогли заметить сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться и освободить остальных заложников. Вы обдумываете дальнейшие действия',
    options: [
      {
        text: 'Идти вместе и искать выход',
        nextText: 3.11
      },  
      {
        text: 'Разделиться на группы и осмотреть дом',
        nextText: 3.12
      }
    ]
  },
  {
    id: 4.99,
    text: 'Вы накинулись на убийцу и вонзили в него осколок, это ранение помогло сбить его с толку, благодаря чему остальные выжившие повалили его на землю и забили маньяка всем что они нашли. Через сутки как вы пропали вас начали искать все спец службы. В итоге они нашли вас и заложников вместе с мёртвым маньяком. Вы спаслись.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Решив подождать, когда начнутся активности вы наблюдаете, как с особой жестокостью убийца избивает и уносит жертв за дверь, пока маньяк очередной раз забирал новую жертву вы смогли тщательно разглядеть его лицо и уже не забудете его.',
    options: [
      {
        text: 'Остаться и также бездействовать',
        nextText: 5.1
      },
      {
        text: 'Осмотреться и попытаться освободиться',
        setState: { glass: true },
        nextText: 5.2
      }
    ]
  },
  {
    id: 5.1,
    text: 'Решив ещё подождать, вы дождались и настала ваша очередь стать жертвой убийцы. ВЫ ПОГИБЛИ!',
    options: [
      {
        text: 'Начать с начала',
        nextText: -1
      }
    ]
  },
  {
    id: 5.2,
    text: 'Оглядевшись, вы замечаете сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться.',
    options: [
      {
        text: 'Вонзить в спину маньяка осколок',
        requiredState: (currentState) => currentState.glass,
        nextText: 5.3
      },
      {
        text: 'Попытаться выйти через дверь',
        nextText: 6
      }
    ]
  },
  {
    id: 5.3,
    text: 'Вы догнали маньяка и смогли вонзить осколок в его спину, однако в одиночку с одним осколком его не получилось нейтрализовать. В итоге настала ваша очередь стать жертвой убийцы. ВЫ ПОГИБЛИ!',
    options: [
      {
        text: 'Начать с начала',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Вы поднимаетесь по лестнице и оказываетесь в полуразрушенном доме. Свет слабый, но достаточно, чтобы увидеть, что дом в запустении. Паутина, пыль и старые, полуразрушенные мебель и вещи вокруг.',
    options: [
      {
        text: 'Исследовать кухню',
        setState: { glass: false, knife: true },
        nextText: 7
      },
      {
        text: 'Осмотреть спальню',
        setState: { kitchen: true },
        nextText: 8
      },
    ]
  },
  {
    id: 7,
    text: 'На кухне царит беспорядок, но вы замечаете нож на столе. Вы берёте его на всякий случай. Вдруг вы слышите шаги и успеваете спрятаться под столом. Сюда пришёл убийца.',
    options: [
      {
        text: 'Напасть на убийцу ножом',
        requiredState: (currentState) => currentState.knife,
        setState: { knife: false },
        nextText: 7.1
      },
      {
        text: 'Остаться на месте',
        nextText: 7.2
      }
    ]
  },
  {
    id: 7.2,
    text: 'Маньяк заметил отсутствие ножа и начал искать его',
    options: [
      {
        text: 'Напасть на убийцу ножом пока он ищет',
        requiredState: (currentState) => currentState.knife,
        setState: { knife: false },
        nextText: 7.1
      },
      {
        text: 'Остаться на месте',
        nextText: 7.3
      },
      {
        text: 'Сбежать в спальню за его спиной',
        nextText: 8
      }
    ]
  },
  {
    id: 7.1,
    text: 'Вы смогли нанести удар ножом в спину убийцы и сбежать незаметно в спальню, но из-за этого вы потеряли нож и убийца всё ещё не умер.',
    options: [
      {
        text: 'Далее',
        nextText: 8
      }
    ]
  },
  {
    id: 7.3,
    text: 'Вы не сдвинулись с места, из-за чего в итоге маньяк нашёл вас. ВЫ ПОГИБЛИ!',
    options: [
      {
        text: 'Начать с начала',
        nextText: -1
      }
    ]
  },
  {
    id: 8,
    text: 'Вы находитесь в спальне и находите документы, которые содержат информацию о каждом заложнике, включая вас. Тем временем вы услышали шаги и прячьтесь под кровать. Убийца проходит мимо, не замечая вас.',
    options: [
      {
        text: 'Попробовать незаметно последовать за убийцей',
        nextText: 8.1
      },
      {
        text: 'Пойти на кухню',
        requiredState: (currentState) => currentState.kitchen,
        setState: { glass: false, knife: true },
        nextText: 8.2
      }
    ]
  },
  {
    id: 8.2,
    text: 'На кухне царит беспорядок, но вы замечаете нож на столе. Вы берёте его на всякий случай.',
    options: [
      {
        text: 'Попробовать незаметно последовать за убийцей',
        nextText: 8.1
      }
    ]
  },
  {
    id: 8.1,
    text: 'Вы незаметно отправились по следам убийцы в надежде найти выход. В итоге вы его нашли, но тем временем издаётся крик оставшегося заложника в подвале.',
    options: [
      {
        text: 'Помочь заложнику',
        nextText: 9
      },
      {
        text: 'Сбежать отсюда',
        nextText: 8.9
      }
    ]
  },
  {
    id: 8.9,
    text: 'Вам удалось сбежать от маньяка целым и невредимым. Через сутки как вы пропали вас начали искать все спец службы и нашли вас одного. К сожалению, убийца и тот самый заложник так и не найдены. Вы спаслись.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Вы спустились в подвал и теперь сталкиваетесь с убийцей лицом к лицу. Он молча держит оставшегося заложника.',
    options: [
      {
        text: 'Напасть на убийцу ножом, рискуя жизнью заложника',
        requiredState: (currentState) => currentState.knife,
        nextText: 9.1
      },
      {
        text: 'Напасть на убийцу, рискуя жизнью заложника',
        nextText: 9.2
      },
      {
        text: 'Тянуть время пока заложник пытается достать осколок рядом',
        requiredState: (currentState) => currentState.bond,
        nextText: 10
      }
    ]
  },
  {
    id: 9.1,
    text: 'Перед вашим нападением маньяк успел смертельно ранить заложника. Во время напедния вы смогли удачно пырнуть убийцу, однако он и вам успел нанести серьёзный урон. Через сутки как вы пропали вас начали искать все спец службы. В итоге они нашли вас и заложников вместе с маньяком мёртвыми. ВЫ ПОГИБЛИ.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 9.2,
    text: 'Перед вашим нападением маньяк успел смертельно ранить заложника. Во время напедния вы не смогли удачно пырнуть убийцу, когда как вам смог нанести серьёзный урон. ВЫ ПОГИБЛИ.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'Вы заметили как вам заложник, незаметно для маньяка, намекает на то, что почти достал осколок рядом. Вы тянули время, благодаря чему он смог ранить маньяка и сбежать от его захвата.',
    options: [
      {
        text: 'Сбежать с заложником',
        nextText: 10.1
      },
      {
        text: 'Напасть обоим на маньяка',
        nextText: 10.2
      },
      {
        text: 'Напасть обоим на маньяка, при этом ещё используя нож',
        requiredState: (currentState) => currentState.knife,
        nextText: 10.3
      }
    ]
  },
  {
    id: 10.2,
    text: 'Вы набросились с заложником на маньяка. Вы смогли одолеть маньяка, но к сожалению заложник был смертельно ранен. Через сутки как вы пропали вас начали искать все спец службы и нашли вас, а также мёртвых заложников и мёртвого маньяка. Вы спаслись.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  },
  {
    id: 10.3,
    text: 'Вы набросились с заложником на маньяка. Вы смогли удачно ранить маньяка и остаться целыми. Через сутки как вы пропали вас начали искать все спец службы и нашли вас и заложника, а также мёртвого маньяка. Вы спаслись.',
    options: [
      {
        text: 'Конец',
        nextText: -1
      }
    ]
  }
]
const audio = new Audio();
      audio.src = "./knopka-suhaya-chetkii-blizkii-yarkii.mp3";
      const button = document.getElementsByClassName("btn");
      Array.from(button).forEach(element => {
        console.log(element);
        element.addEventListener("click", () => { 
          audio.play(); 
        })
       
      });

startGame()