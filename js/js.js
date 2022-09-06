window.onload = function(){
	// Botões
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelarBtn = document.getElementById('cancelar');
	var AddBtn = document.getElementById('Add');
	// Campos do formulario
	var nomecompleto = document.getElementById('nomecompleto');
	var telefone = document.getElementById('telefone');
	var id = document.getElementById('id');
	var busca = document.getElementById('busca')

	var addBookDiv = document.querySelector('.addbook');

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
	});

	cancelarBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);

	//Busca de pessoas
	busca.addEventListener("keydown", x => {
		if(x.key === 'Enter' && busca.value !== ''){
			let pessoa = addressBook.find (pessoa => pessoa.nomecompleto === busca.value)
			if(pessoa === undefined){
				alert ("PESSOA NÃO ENCONTRADA!!"); return
			}
			alert ("Nome da Pessoa: " + pessoa.nomecompleto + "  ID: " + pessoa.id + "  Telefone: " + pessoa.telefone);
		}


	})

	// Storage Array
	var addressBook = [];


	function jsonStructure(nomecompleto,telefone,id){
		this.nomecompleto = nomecompleto;
		this.telefone = telefone;
		this.id = id;
	}

	function addToBook(){
		var isNull = nomecompleto.value!='' && telefone.value!='' && id.value!='';
		if(isNull){
			// Fromatando o input para uma structure JSON
			var obj = new jsonStructure(nomecompleto.value,telefone.value,id.value);
			addressBook.push(obj);
			localStorage['addbook'] = JSON.stringify(addressBook);
			quickAddFormDiv.style.display = "none";
			clearForm();
			showAddressBook();
		}
	}

	function removeEntry(e){
		// Removendo um contato da lista
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(addressBook);
			showAddressBook();
		}
	}
    //
	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}


	function showAddressBook(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			addressBook = JSON.parse(localStorage['addbook']);
			// Loop no array e inserção na página
			addBookDiv.innerHTML = '';
			for(var n in addressBook){
				var str = '<div class="entry">';
					str += '<div class="name"> Nome: ' + addressBook[n].nomecompleto + '</div>';
					str += '<div class="id"> ID: ' + addressBook[n].id + '</div>';
					str += '<div class="telefone"> Telefone: ' + addressBook[n].telefone + '</div>';
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Deletar</a></div>';
					str += '</div>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showAddressBook();

}