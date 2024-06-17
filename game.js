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
        setState: { blueGoo: true },
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
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: ' Попробовать поговорить с другими заложниками.',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 4
      },
      {
        text: ' Оставаться неподвижным и ждать развития событий.',
        nextText: 5
      }
    ]
  },
  {
    id: 3,
    text: 'Оглядевщись вы земечаете лишь сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться.',
    options: [
      {
        text: ' Освободить остальных заложников.',
        nextText: 3.1
      },
      {
        text: '  Искать выход самостоятельно.',
        nextText: 3.2
      }
    ]
  },
  {
    id: 3.1,
    text: 'Вы освободили других заложников, теперь они вам доверяют и ждут ващих последующих действий.',
    options: [
      {
        text: 'Попробовать выйти через дверь',
        nextText: 3.11
      },
      
      {
        text: 'Осмотреть комнату вместе с остальными заложниками ',
        nextText: -1
      },
      {
        text: 'Начать звать маньяка и попробовать сразится с ним всем вместе',
        nextText: 3.13
      },
    ]
  },
  {
    id: 3.11,
    text: 'Вы выходите через дверь и видите темный длинный коридор пройдя чуть вперед вы дохолите до лесницы и проходя все выше по ней вам в нос начинает бить сильный запах серы поднявшись вы уже стоите двери на вершине лесницы  ',
    options: [
      {
        text: 'Открыть дверь и выйти чтобы осмотреться ',
        nextText: -1
      },
      
      {
        text: 'Осмотреть дверь на наличие ловущек ',
        nextText: -1
      },
      {
        text: 'Начать звать маньяка и попробовать сразится с ним всем вместе',
        nextText: -1
      },
    ]
  },
  {
    id: 3.12,
    text: 'Вы освободили других заложников, теперь они вам доверяют и ждут ващих последующих действий.',
    options: [
      {
        text: 'Попробовать выйти через дверь',
        nextText: -1
      },
      
      {
        text: 'Осмотреть комнату вместе с остальными заложниками ',
        nextText: -1
      },
      {
        text: 'Начать звать маньяка и попробовать сразится с ним всем вместе',
        nextText: -1
      },
    ]
  },
  {
    id: 3.13,
    text: 'Вы встали перед дверью, чтобы удержать его пока остальные стояли в стороне и жрали момента. Hо убийца распахнув дверь очень быстро и неожиданно набросилился на вас и держа большой ржавый нож у своего пояса и с огромной скоростью выпрямив руки он вонзил нож в область тонкой кишки, повалив вас на землю он нанес еще несколько в облости груди. Пока маньяк продолжал с особой жестокостью наносить удары заложники хоть и уже поздно но успели среагировать и забить маньяка всем что они нашли. Через сутки как вы пропали вас начали искать все спец службы и нашли вас и золожников вместе с обезжвиженными маньков заброшеном дома, но уже было поздно. ВЫ ПОГИБЛИ! ',
    options: [
      {
        text: 'Начать с начала',
        nextText: -1
      },
    ]
  },
  {
    id: 3.2,
    text: 'Оглядевщись вы земечаете лишь сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться',
    options: [
      {
        text: ' Освободить остальных заложников.',
        nextText: -1
      },
      {
        text: '  Искать выход самостоятельно.',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: 'Ваш шепот привлекает внимание других. Один из заложников отвечает: "Меня зовут Ирина. Я здесь уже несколько дней. Мы должны что-то предпринять."',
    options: [
      {
        text: ' Согласиться и начать действовать вместе.',
        nextText: 4.1
      },
      {
        text: ' Отказаться и попытаться освободиться самостоятельно.',
        nextText: -1
      }
    ]
  },
  {
    id: 4.1,
    text: 'Оглядевщись вы земечаете сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться и освободить остальных заложников.',
    options: [
      {
        text: 'Попытаться выйти через дверь',
        nextText: -1
      },
      {
        text: 'Осмотреть комнату на наличие чего то полезного',
        nextText: 4.12
      },
     {
        text: 'какое то действие',
        nextText: -1
      },
     
    ]
  },
  {
    id: 4.12,
    text: 'Вы нечего не нашли',
    options: [
      {
        text: 'продолжить',
        nextText: 4.121
      },
     
     
    ]
  },
  {
    id: 4.121,
    text: 'Оглядевщись вы земечаете сломанное зеркало и кучу осколков стекла, подобрав самый большой осколок вы смогли освободиться и освободить остальных заложников.',
    options: [
      {
        text: 'Попытаться выйти через дверь',
        nextText: -1
      },
     {
        text: 'какое то действие',
        nextText: 4.1211
      },
     
    ]
  },
  {
    id: 4.1211,
    text: '',
    options: [
      {
        text: 'Попытаться выйти через дверь',
        nextText: -1
      },
     {
        text: 'какое то действие',
        nextText: -1
      },
     
    ]
  },
  {
    id: 5,
    text: 'Решив подождать, когда начнутся активности вы наблюдаете, как с особой жестокось убийца избивает и уносит жертв за дверь , пока маньяк очередной раз забирал новую жертву вы смогли тщательно разглядеть его лицо и уже не забудете его.',
    options: [
      {
        text: 'Остаться и также бездействовать',
        nextText: 5.1
      },{
        text: 'Осмотреться и попытаться освободиться',
        nextText: 5.2
      }
    ]
  },
  {
    id: 5.1,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: -1
      }
    ]
  },
  {
    id: 5.2,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  },
  {
    id: 12,
    text: 'fhfhfh',
    options: [
      {
        text: 'ffhfhf',
        nextText: -1
      },{
        text: 'ffhfhf',
        nextText: -1
      },{
        text: 'ffhfhf',
        nextText: -1
      },{
        text: 'ffhfhf',
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