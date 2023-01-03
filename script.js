// -----------------------Data---------------------------------

var data_creation = document.createElement('div')
data_creation.setAttribute('id','parent-data')
var data_outview = document.createElement('div')
data_outview.setAttribute('id', 'outview');
data_outview.append(data_creation)
document.querySelector('body').append(data_outview)

// -----------------------Pagination---------------------------------

var page_parent = document.createElement('div')
page_parent.setAttribute('id','parent-pagination')

var page_child = document.createElement('div')
page_child.setAttribute('id','pagination')

var creating_prev = document.createElement('button')             // For Previous
creating_prev.setAttribute('class', 'btn-previous')
creating_prev.setAttribute('for', 'previous')

creating_prev.innerText = 'Previous'
page_child.append(creating_prev);

for(let i = 1; i<=5; i++){                                      // For 5 buttons
    var creating_bt = document.createElement('button')
    creating_bt.setAttribute('class', `btn-${i}`)
    creating_bt.setAttribute('for', `${i}`)
    creating_bt.setAttribute('onclick', 'btn_clicked(this)')
    creating_bt.innerText = `${i}`
    page_child.append(creating_bt);
}

var creating_next = document.createElement('button')
creating_next.setAttribute('class', 'btn-next')
creating_next.setAttribute('for', 'next')

creating_next.innerText = 'Next'
page_child.append(creating_next);

page_parent.append(page_child)
document.querySelector('body').append(page_parent)

var btn_next = document.querySelector('.btn-next');             // For next
var user_data = 50;
var iter_val = (parseInt(user_data/5)) * 5;
var check = user_data % 5;

btn_next.addEventListener('click', ()=>{

    for(i=1;i<=5;i++){
        var taking_for = document.querySelector(`.btn-${i}`);

        var attribute_val = Number(taking_for.getAttribute('for'));

        if(attribute_val <= iter_val - 5){

            var increasing_attribute_val = attribute_val + 5

            taking_for.setAttribute('for', increasing_attribute_val);

            taking_for.innerText = increasing_attribute_val;
        }
    }
})


// For Previous

var btn_previous = document.querySelector('.btn-previous');
btn_previous.addEventListener('click', ()=>{

for(i=1;i<6;i++){

    var taking_for = document.querySelector(`.btn-${i}`);

    var attribute_val = Number(taking_for.getAttribute('for'));

    if(attribute_val>5){

        var decreasing_attribute_val = attribute_val - 5

        taking_for.setAttribute('for', decreasing_attribute_val);

        taking_for.innerText = decreasing_attribute_val;
    }
    
}
})


async function res_fetching(e){
    var url_data = 'https://pokeapi.co/api/v2/pokemon/'

    var url_fetch = await fetch(url_data)

    var res = await url_fetch.json()

    try{
        var for_num = parseInt(e.getAttribute('for')) - 1
    
        if(for_num < 20){

            var name = res['results'][for_num]['name']

            var title = document.createElement('h1')
            title.innerText = name
            title.setAttribute('class','title')
            data_creation.append(title)

            var url_fetch2 = await fetch(res.results[for_num].url)
            var url_res = await url_fetch2.json()

            try{
                var image_creation = document.createElement('img')
                image_creation.setAttribute('class', 'imgtag')
                image_creation.setAttribute('src',url_res.sprites.front_default)
                image_creation.setAttribute('alt', 'Sorry!, Image is not loaded')
                data_creation.append(image_creation)

                var weight_data = document.createElement('h4')
                weight_data.innerText = `Weight: ${url_res.weight}`
                weight_data.setAttribute('class','weighttag')

                data_creation.append(weight_data)

                var ability_title = document.createElement('h4')
                ability_title.innerText = 'Abilities:'
                ability_title.setAttribute('class','abilitytag')
                data_creation.append(ability_title)

                for(let i = 0; i<url_res.abilities.length;i++){
                    var ul_tag = document.createElement('ul')
                    ul_tag.innerHTML = `
                    <li><p>${url_res.abilities[i].ability.name}</P></li>`
                    data_creation.append(ul_tag)
                }

                var moves_title = document.createElement('h4')
                moves_title.innerText = 'Moves:'
                moves_title.setAttribute('class','movetag')
                data_creation.append(moves_title)

                for(let i = 0; i<url_res.moves.length;i++){
                    var ul_tag = document.createElement('ul')
                    ul_tag.innerHTML = `
                    <li><p>${url_res.moves[i].move.name}</P></li>`
                    data_creation.append(ul_tag)
                }


            }
            catch(e){
                console.log("Error has occured while fetching from inside link")
            }
        }

        else if(for_num >= 20 && for_num < 40){

            // var url_fetch = await fetch(url_data)
            // var res = await url_fetch.json()

            var url_next = await fetch(res.next)
            var next_res = await url_next.json()

            try{

                var ind_num = for_num-20;

                var name = next_res['results'][ind_num]['name']

                var title = document.createElement('h1')
                title.innerText = name
                title.setAttribute('class','title')
                data_creation.append(title)

                var url_fetch2 = await fetch(next_res.results[ind_num].url)
                var url_res = await url_fetch2.json()

                try{

                    var image_creation = document.createElement('img')
                    image_creation.setAttribute('src',url_res.sprites.front_default)
                    image_creation.setAttribute('class', 'imgtag')
                    image_creation.setAttribute('alt', 'Sorry!, Image is not loaded')
                    data_creation.append(image_creation)

                    var weight_data = document.createElement('h4')
                    weight_data.innerText = `Weight: ${url_res.weight}`
                    weight_data.setAttribute('class','weighttag')

                    data_creation.append(weight_data)

                    var ability_title = document.createElement('h4')
                    ability_title.innerText = 'Abilities:'
                    ability_title.setAttribute('class','abilitytag')
                    data_creation.append(ability_title)

                    for(let i = 0; i<url_res.abilities.length;i++){
                        var ul_tag = document.createElement('ul')
                        ul_tag.innerHTML = `
                        <li><p>${url_res.abilities[i].ability.name}</P></li>`
                        data_creation.append(ul_tag)
                    }

                    var moves_title = document.createElement('h4')
                    moves_title.innerText = 'Moves:'
                    moves_title.setAttribute('class','movetag')
                    data_creation.append(moves_title)

                    for(let i = 0; i<url_res.moves.length;i++){
                        var ul_tag = document.createElement('ul')
                        ul_tag.innerHTML = `
                        <li><p>${url_res.moves[i].move.name}</P></li>`
                        data_creation.append(ul_tag)
                    }

                }
                catch(e){
                    console.log("Error 20 to 40 inside link")
                }
            }
            catch(e){
                console.log("Error for 20 to 40")
            }
        }

        else if((for_num >= 40 && for_num < 50)){

            // var url_fetch = await fetch(url_data)
            // var res = await url_fetch.json()

            var url_next = await fetch(res.next)
            var next_res = await url_next.json()

            try{

                var url_next2 = await fetch(next_res.next)
                var next2_res = await url_next2.json()

                try{

                    let ind_num = for_num-40;

                    var name = next2_res['results'][ind_num]['name']

                    var title = document.createElement('h1')
                    title.innerText = name
                    title.setAttribute('class','title')
                    data_creation.append(title)

                    var url_fetch2 = await fetch(next2_res.results[ind_num].url)
                    var url_res = await url_fetch2.json()

                    try{
                        var image_creation = document.createElement('img')
                        image_creation.setAttribute('src',url_res.sprites.front_default)
                        image_creation.setAttribute('class', 'imgtag')
                        image_creation.setAttribute('alt', 'Sorry!, Image is not loaded')
                        data_creation.append(image_creation)

                        var weight_data = document.createElement('h4')
                        weight_data.innerText = `Weight: ${url_res.weight}`
                        weight_data.setAttribute('class','weighttag')

                        data_creation.append(weight_data)

                        var ability_title = document.createElement('h4')
                        ability_title.innerText = 'Abilities:'
                        ability_title.setAttribute('class','abilitytag')
                        data_creation.append(ability_title)

                        for(let i = 0; i<url_res.abilities.length;i++){
                            var ul_tag = document.createElement('ul')
                            ul_tag.innerHTML = `
                            <li><p>${url_res.abilities[i].ability.name}</P></li>`
                            data_creation.append(ul_tag)
                        }

                        var moves_title = document.createElement('h4')
                        moves_title.innerText = 'Moves:'
                        moves_title.setAttribute('class','movetag')
                        data_creation.append(moves_title)

                        for(let i = 0; i<url_res.moves.length;i++){
                            var ul_tag = document.createElement('ul')
                            ul_tag.innerHTML = `
                            <li><p>${url_res.moves[i].move.name}</P></li>`
                            data_creation.append(ul_tag)
                        }
                    }
                    catch(e){
                        console.log("Error 41 to 50 inside link")
                    }
                }
                catch(e){
                    console.log("Error occured while fetching 41 to 50")
                }
            }
            catch(e){
                console.log("Error occured while fetching 20 to 40")
            }
        }
    }
    catch(e){
        console.log("Error has been occured")
    }

    
    
}

function btn_clicked(e){
    data_creation.innerText = '';
    res_fetching(e)
}

var head = document.createElement('header')
head.innerHTML = `<img src='title.png'>`

var creation_head = document.createElement('div')
creation_head.setAttribute('id','head')
creation_head.append(head)

document.querySelector('body').insertAdjacentElement("afterbegin",creation_head)

var foot = document.createElement('footer')
foot.append(page_parent)

var creation_foot = document.createElement('div')
creation_foot.setAttribute('id','foot')
creation_foot.append(foot)

document.querySelector('#outview').insertAdjacentElement("afterend", creation_foot)