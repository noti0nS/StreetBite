(() => {
  const createItemButton = document.querySelector(".createItem");
  const gridSection = document.querySelector(".gridSection");

  const wizardSection = document.querySelector("#itemWizard");
  const wizardTitle = document.querySelector("#wizardTitle");
  const wizardSubtitle = document.querySelector("#wizardSubtitle");
  const wizardStepItem = document.querySelector("#wizardStepItem");
  const wizardNext = document.querySelector("#wizardNext");
  const wizardCancel = document.querySelector("#wizardCancel");

  const inputName = document.querySelector("#inputName");
  const selectCategory = document.querySelector("#selectCategory");
  const inputPrice = document.querySelector("#inputPrice");
  const inputDesc = document.querySelector("#inputDesc");

  const inputFile = document.querySelector("#files");
  const imgArea = document.querySelector(".imgDivModal");
  const imageImg = document.querySelector("#imageImg");

  const optionsGET = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let editMode = false;
  let editingItemId = null;

  function getProductImageByNameOrCategory(nome, categoria) {
    const normalizedName = (nome || "").trim().toLowerCase();

    if (normalizedName === "big sb") return "../Imgs/images/items/bigSB";
    if (normalizedName === "big sb bacon") return "../Imgs/images/items/bigSBbacon";
    if (normalizedName === "big sb cheddar") return "../Imgs/images/items/bigSBCheddar";
    if (normalizedName === "classic sb") return "../Imgs/images/items/cheeseClassic";

    if (categoria === "BEBIDA") return "../Imgs/images/eachCategory/bebida.jpg";
    if (categoria === "ACOMPANHAMENTO") return "../Imgs/images/eachCategory/acompanhamento.jpg";
    if (categoria === "COMBO") return "../Imgs/images/eachCategory/combo.jpg";
    return "../Imgs/images/eachCategory/lanche.jpg";
  }

  function resetWizardForm() {
    inputName.value = "";
    selectCategory.value = "LANCHE";
    inputPrice.value = "";
    inputDesc.value = "";
    imageImg.src = "";
  }

  function openWizard(mode, produto = null) {
    editMode = mode === "edit";
    editingItemId = produto?.id ?? null;

    if (editMode && produto) {
      wizardTitle.textContent = "Assistente de Edição de Item";
      wizardSubtitle.textContent = "Atualize os dados do item selecionado.";
      inputName.value = produto.nome ?? "";
      selectCategory.value = produto.categoria ?? "LANCHE";
      inputPrice.value = produto.preco ?? "";
      wizardNext.textContent = "Salvar Edição";
    } else {
      wizardTitle.textContent = "Assistente de Criação de Item";
      wizardSubtitle.textContent = "Preencha os dados para cadastrar um novo item no cardápio.";
      resetWizardForm();
      wizardNext.textContent = "Criar Item";
    }

    wizardStepItem.classList.remove("hidden");

    wizardSection.classList.add("is-open");
  }

  function closeWizard() {
    wizardSection.classList.remove("is-open");
    editMode = false;
    editingItemId = null;
    resetWizardForm();
    wizardStepItem.classList.remove("hidden");
    wizardNext.textContent = "Criar Item";
  }

  // Close wizard when clicking outside (on the overlay)
  wizardSection.addEventListener("click", (e) => {
    if (e.target === wizardSection) {
      closeWizard();
    }
  });

async function saveItem() {
  const nome = inputName.value.trim();
  const preco = inputPrice.value;
  const categoria = selectCategory.value;

  if (!nome || !preco || !categoria) {
    alert("Preencha nome, categoria e preço antes de continuar.");
    return;
  }

  const payload = {
    nome,
    preco,
    categoria,
  };

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  if (editMode && editingItemId) {
    await fetch(`http://localhost:8080/api/v1/produtos/${editingItemId}`, {
      ...requestOptions,
      method: "PATCH",
    });
  } else {
    await fetch("http://localhost:8080/api/v1/produtos", {
      ...requestOptions,
      method: "POST",
    });
  }

  closeWizard();
  window.loadPage("menu");
}

fetch("http://localhost:8080/api/v1/produtos", optionsGET)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let index = 0; index < data.length; index++) {
      let grid = document.createElement("div");
      let productName = document.createElement("h2");
      let itemImageDiv = document.createElement("div");
      let itemImage = document.createElement("img");
      let productCategory = document.createElement("h2");
      let productPrice = document.createElement("h3");
      let editButton = document.createElement("button");
      let editImg = document.createElement("img");
      let deleteButton = document.createElement("button");
      let deleteImg = document.createElement("img");
      let buttonsGridDiv = document.createElement("div");

      let eachID = document.createElement("span");

      grid.className = "grid";
      itemImageDiv.className = "itemImage";
      editButton.className = "editButton";
      deleteButton.className = "editButton";

      buttonsGridDiv.style.display = "flex";
      buttonsGridDiv.style.gap = "10px";
      eachID.value = data[index].id;
      productName.textContent = data[index].nome;
      productCategory.textContent = data[index].categoria;
      productPrice.textContent = "R$" + data[index].preco;

      if (productCategory.textContent == "BEBIDA") {
        itemImage.src = "../Imgs/images/eachCategory/bebida.jpg";
      } else if (productCategory.textContent == "ACOMPANHAMENTO") {
        itemImage.src = "../Imgs/images/eachCategory/acompanhamento.jpg";
      } else if (productCategory.textContent == "LANCHE") {
        itemImage.src = "../Imgs/images/eachCategory/lanche.jpg";
      } else if (productCategory.textContent == "COMBO") {
        itemImage.src = "../Imgs/images/eachCategory/combo.jpg";
      }

      // itemImage.src = imgArea.querySelector("img")
      //   ? imgArea.querySelector("img").src
      //   : "";
      editImg.src = "../Imgs/icons/editIcon.svg";

      deleteImg.src = "../Imgs/icons/deleteIcon.svg";
      grid.appendChild(productName);
      itemImageDiv.appendChild(itemImage);
      grid.appendChild(itemImageDiv);
      grid.appendChild(productCategory);
      grid.appendChild(productPrice);
      buttonsGridDiv.appendChild(editButton);
      buttonsGridDiv.appendChild(deleteButton);
      editButton.appendChild(editImg);

      deleteButton.appendChild(deleteImg);
      grid.appendChild(buttonsGridDiv);
      gridSection.appendChild(grid);

      modalSection.style.display = "none";
      grid.style.animation = "gridAnim .5s";
      deleteButton.addEventListener("click", () => {
        grid.remove();
        const optionsDELETE = {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(
          "http://localhost:8080/api/v1/produtos/" + eachID.value,
          optionsDELETE,
        )
          .then((response) => response)
          .then((data) => {
            console.log(data);
          });
      });
      editButton.addEventListener("click", () => {
        grid.remove();
        modalSection.style.display = "flex";
      });
    }

    closeWizard();
    window.loadPage("menu");
  });

  createItemButton.addEventListener("click", () => openWizard("create"));

  wizardCancel.addEventListener("click", closeWizard);

  // Close wizard when clicking outside (on the overlay)
  wizardSection.addEventListener("click", (e) => {
    if (e.target === wizardSection) {
      closeWizard();
    }
  });

  // Also allow Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wizardSection.classList.contains("is-open")) {
      closeWizard();
    }
  });

  wizardNext.addEventListener("click", saveItem);

  if (window.__streetbitePendingAction === "open-item-wizard") {
    window.__streetbitePendingAction = null;
    openWizard("create");
  }

  fetch("http://localhost:8080/api/v1/produtos", optionsGET)
    .then((response) => response.json())
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        const produto = data[index];

        let grid = document.createElement("div");
        let productName = document.createElement("h2");
        let itemImageDiv = document.createElement("div");
        let itemImage = document.createElement("img");
        let productCategory = document.createElement("h2");
        let productPrice = document.createElement("h3");
        let editButton = document.createElement("button");
        let editImg = document.createElement("img");
        let deleteButton = document.createElement("button");
        let deleteImg = document.createElement("img");
        let buttonsGridDiv = document.createElement("div");

        grid.className = "grid";
        itemImageDiv.className = "itemImage";
        editButton.className = "editButton";
        deleteButton.className = "editButton";

        buttonsGridDiv.style.display = "flex";
        buttonsGridDiv.style.gap = "10px";
        productName.textContent = produto.nome;
        productCategory.textContent = produto.categoria;
        productPrice.textContent = "R$" + produto.preco;

        itemImage.src = getProductImageByNameOrCategory(produto.nome, produto.categoria);
        itemImage.alt = `Imagem do item ${productName.textContent}`;

        editImg.src = "../Imgs/icons/editIcon.svg";
        editImg.alt = "Editar item";

        deleteImg.src = "../Imgs/icons/deleteIcon.svg";
        deleteImg.alt = "Excluir item";
        editButton.setAttribute("aria-label", `Editar ${productName.textContent}`);
        deleteButton.setAttribute("aria-label", `Excluir ${productName.textContent}`);
        grid.appendChild(productName);
        itemImageDiv.appendChild(itemImage);
        grid.appendChild(itemImageDiv);
        grid.appendChild(productCategory);
        grid.appendChild(productPrice);
        buttonsGridDiv.appendChild(editButton);
        buttonsGridDiv.appendChild(deleteButton);
        editButton.appendChild(editImg);

        deleteButton.appendChild(deleteImg);
        grid.appendChild(buttonsGridDiv);
        gridSection.appendChild(grid);

        grid.style.animation = "gridAnim .5s";
        deleteButton.addEventListener("click", () => {
          const optionsDELETE = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };

          fetch(`http://localhost:8080/api/v1/produtos/${produto.id}`, optionsDELETE)
            .then(() => {
              grid.remove();
            });
        });

        editButton.addEventListener("click", () => {
          openWizard("edit", produto);
        });
      }
    });

  inputFile.addEventListener("change", function () {
    const image = this.files[0];
    if (!image) return;

    const reader = new FileReader();
    reader.onload = () => {
      const allImg = imgArea.querySelectorAll("img");
      allImg.forEach((item) => item.remove());
      const imgUrl = reader.result;
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "Pré-visualização da imagem selecionada";
      imgArea.appendChild(img);
      imgArea.dataset.img = image.name;
    };
    reader.readAsDataURL(image);
  });

  createItemButton.addEventListener("click", () => openWizard("create"));

  wizardCancel.addEventListener("click", closeWizard);

  // Close wizard when clicking outside (on the overlay)
  wizardSection.addEventListener("click", (e) => {
    if (e.target === wizardSection) {
      closeWizard();
    }
  });

  // Also allow Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wizardSection.classList.contains("is-open")) {
      closeWizard();
    }
  });

  wizardNext.addEventListener("click", saveItem);

  if (window.__streetbitePendingAction === "open-item-wizard") {
    window.__streetbitePendingAction = null;
    openWizard("create");
  }
})();
