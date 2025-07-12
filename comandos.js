var champions

    async function buscarChampions() {

        const lista = document.getElementById("lengthchamps")
        const response = await fetch("http://localhost:8080/api/champions")

        const data = await response.json()
        champions = data

        data.forEach(champion => {
            lista.innerHTML += `<div class="mouse" onclick="searchIdRef(${champion.id})" style="border: 2px solid black; padding: 12px 0; width: 100%; text-indent: 10px;
             background-image: linear-gradient(to right, black, transparent), url('${champion.imageUrl}'); background-size: 100%;
              background-position: center; color: red; font-weight: bold;">${champion.id} - ${champion.name}</div>`
        })

    }

    async function searchId() {

        var id = document.getElementById("idSearch").value
        var imagem = document.getElementById("imagesrc")
        var hp = document.getElementById("hp/mp")
        var speed = document.getElementById("speed")
        var damage = document.getElementById("damage")
        var namebigger = document.getElementById("champname")
        const response = await fetch(`http://localhost:8080/api/champions/${id}`)
        const data = await response.json()

        imagem.src = data.imageUrl
        hp.innerHTML = `Hp: ${data.hp} Mp: ${data.mp}`
        speed.innerHTML = `Move Speed: ${data.moveSpeed} Armor: ${data.armor}`
        damage.innerHTML = `Attack Damage: ${data.attackDamage} Attack Range: ${data.attackRange}`
        namebigger.textContent = data.name

    }

        async function searchIdRef(id) {

        var hp = document.getElementById("hp/mp")
        var speed = document.getElementById("speed")
        var damage = document.getElementById("damage")    
        var imagem = document.getElementById("imagesrc")
        var namebigger = document.getElementById("champname")
        const response = await fetch(`http://localhost:8080/api/champions/${id}`)
        const data = await response.json()

        imagem.src = data.imageUrl
        hp.innerHTML = `Hp: ${data.hp} Mp: ${data.mp}`
        speed.innerHTML = `Move Speed: ${data.moveSpeed} Armor: ${data.armor}`
        damage.innerHTML = `Attack Damage: ${data.attackDamage} Attack Range: ${data.attackRange}`
        namebigger.textContent = data.name

    }