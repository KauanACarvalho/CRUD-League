var champions

async function buscarChampions() {

    const lista = document.getElementById("lengthchamps")
    const response = await fetch("http://localhost:8080/api/champions")

    lista.innerHTML = ""

    const data = await response.json()
    champions = data

    data.forEach(champion => {
        lista.innerHTML += `<div class="mouse" onclick="searchIdRef(${champion.id})" style="border: 2px solid black; padding: 12px 0;
             width: 100%; text-indent: 10px; background-image: linear-gradient(to right, black, transparent), url('${champion.imageUrl}'); 
             background-size: 100%; background-position: center; color: red; font-weight: bold;">${champion.id} - ${champion.name}</div>`
    })

}

async function searchId() {

    var id = document.getElementById("idSearch").value

    juncao(id)
}

async function searchIdRef(id) {

    juncao(id)
}

function testimg() {

    var img = document.getElementById("cimg")
    var input = document.getElementById("curl")

    img.src = input.value

    input.value = ""
}

async function juncao(id) {


    var imagem = document.getElementById("imagesrc")
    var namebigger = document.getElementById("champname")
    var deleteBtn = document.getElementById("delete")
    var code = document.getElementById("code")
    var title = document.getElementById("champtitle")
    var estilo = document.getElementById("champtag")
    const response = await fetch(`http://localhost:8080/api/champions/${id}`)
    const data = await response.json()

    estilo.innerHTML = ""
    imagem.src = data.imageUrl
    namebigger.textContent = data.name
    deleteBtn.style.visibility = "visible"
    code.innerHTML = data.id
    title.innerHTML = data.title
    table.innerHTML = `<tbody>
                        <tr>
                            <td class="tdNome">HP</td>
                            <td class="tdValor">${data.hp}</td>
                        </tr>
                        <tr>
                            <td class="tdNome">MP</td>
                            <td class="tdValor">${data.mp}</td>
                        </tr>
                        <tr>
                            <td class="tdNome">Armor</td>
                            <td class="tdValor">${data.armor}</td>
                        </tr>
                        <tr>
                            <td class="tdNome">Move Speed</td>
                            <td class="tdValor">${data.moveSpeed}</td>
                        </tr>
                        <tr>
                            <td class="tdNome">Attack Damage</td>
                            <td class="tdValor">${data.attackDamage}</td>
                        </tr>
                        <tr>
                            <td class="tdNome">Attack Range</td>
                            <td class="tdValor">${data.attackRange}</td>
                        </tr>
                    </tbody>`

    data.tags.forEach(tag => {
        estilo.innerHTML += `<div style="background-color: red; padding: 5px; border-radius: 35%">${tag}</div>`
    })
}

async function send() {

    var hpInput = document.getElementById("chp")
    var mpInput = document.getElementById("cmp")
    var armorInput = document.getElementById("carmor")
    var speedInput = document.getElementById("cmvspd")
    var damageInput = document.getElementById("cattdmg")
    var rangeInput = document.getElementById("cattrg")
    var nameInput = document.getElementById("cname")
    var imgInput = document.getElementById("cimg")
    var titleInput = document.getElementById("ctitle")
    var descriptionInput = document.getElementById("cdescrip")
    var tagsInput = document.getElementById("ctag")

    const response = await fetch("http://localhost:8080/api/champions", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            title: titleInput.value,
            description: descriptionInput.value,
            imageUrl: imgInput.src,
            tags: [
                tagsInput.value
            ],
            hp: hpInput.value,
            mp: mpInput.value,
            moveSpeed: speedInput.value,
            armor: armorInput.value,
            attackRange: rangeInput.value,
            attackDamage: damageInput.value
        })
    })

    const id = await response.text()

    const status = response.status

    if (status == 201) {
        juncao(id)
        buscarChampions()
        hpInput.value = ""
        mpInput.value = ""
        armorInput.value = ""
        speedInput.value = ""
        damageInput.value = ""
        rangeInput.value = ""
        nameInput.value = ""
        imgInput.src = ""
        titleInput.value = ""
        descriptionInput.value = ""
        tagsInput.value = ""
        alert("Created Successfuly!!")
    } else {
        alert(`Error Status ${status}`)
    }


}

async function deleteById() {

    var id = document.getElementById("code").textContent

    const response = await fetch(`http://localhost:8080/api/champions/${id}`, {
        method: "DELETE"
    })

    location.reload()
}






