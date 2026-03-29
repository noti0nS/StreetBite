(() => {
  const gridSection = document.querySelector(".gridSection");
  const openOrderWizard = document.querySelector("#openOrderWizard");

  const wizardSection = document.querySelector("#orderWizard");
  const wizardStepLocal = document.querySelector("#orderWizardStepLocal");
  const wizardStepDetails = document.querySelector("#orderWizardStepDetails");
  const wizardBack = document.querySelector("#orderWizardBack");
  const wizardNext = document.querySelector("#orderWizardNext");
  const wizardCancel = document.querySelector("#orderWizardCancel");

  const orderType = document.querySelector("#orderType");
  const addressGroup = document.querySelector("#addressGroup");
  const orderCep = document.querySelector("#orderCep");
  const orderDistrict = document.querySelector("#orderDistrict");
  const orderStreet = document.querySelector("#orderStreet");
  const orderNumber = document.querySelector("#orderNumber");

  const orderPayment = document.querySelector("#orderPayment");
  const orderProduct = document.querySelector("#orderProduct");
  const orderQuantity = document.querySelector("#orderQuantity");
  const addOrderItem = document.querySelector("#addOrderItem");
  const orderCart = document.querySelector("#orderCart");
  const orderSubtotal = document.querySelector("#orderSubtotal");

  const optionsGET = {
    method: "GET",
  };

  let currentStep = 1;
  let products = [];
  let cartItems = [];

  function formatCurrency(value) {
    return Number(value).toFixed(2);
  }

  function categoryImage(category, nome) {
    const normalizedName = (nome || "").trim().toLowerCase();

    if (normalizedName === "big sb") return "../Imgs/images/items/bigSB";
    if (normalizedName === "big sb bacon")
      return "../Imgs/images/items/bigSBbacon";
    if (normalizedName === "big sb cheddar")
      return "../Imgs/images/items/bigSBCheddar";
    if (normalizedName === "classic sb")
      return "../Imgs/images/items/cheeseClassic";

    if (category === "BEBIDA") return "../Imgs/images/eachCategory/bebida.jpg";
    if (category === "ACOMPANHAMENTO")
      return "../Imgs/images/eachCategory/acompanhamento.jpg";
    if (category === "COMBO") return "../Imgs/images/eachCategory/combo.jpg";
    return "../Imgs/images/eachCategory/lanche.jpg";
  }

  function showWizardStep(step) {
    currentStep = step;
    wizardStepLocal.classList.toggle("hidden", step !== 1);
    wizardStepDetails.classList.toggle("hidden", step !== 2);
    wizardBack.disabled = step === 1;
    wizardNext.textContent = step === 1 ? "Próximo >" : "Criar Pedido";
  }

  function renderCart() {
    orderCart.innerHTML = "";
    let subtotal = 0;

    cartItems.forEach((item) => {
      subtotal += item.precoUnitario * item.quantidade;

      const cartItem = document.createElement("div");
      cartItem.className = "orderCartItem";

      const text = document.createElement("span");
      text.textContent = `${item.produtoNome} (${item.quantidade}x) - R$${formatCurrency(item.precoUnitario * item.quantidade)}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remover";
      remove.addEventListener("click", () => {
        cartItems = cartItems.filter((cartEntry) => cartEntry.uid !== item.uid);
        renderCart();
      });

      cartItem.appendChild(text);
      cartItem.appendChild(remove);
      orderCart.appendChild(cartItem);
    });

    orderSubtotal.textContent = `Subtotal: R$${formatCurrency(subtotal)}`;
  }

  function resetWizardForm() {
    orderType.value = "";
    orderPayment.value = "";
    orderProduct.value = "";
    orderQuantity.value = 1;
    orderCep.value = "";
    orderDistrict.value = "";
    orderStreet.value = "";
    orderNumber.value = "";
    cartItems = [];
    renderCart();
    showWizardStep(1);
  }

  function openWizard() {
    wizardSection.classList.add("is-open");
    resetWizardForm();
  }

  function closeWizard() {
    wizardSection.classList.remove("is-open");
    resetWizardForm();
  }

  async function fillProductOptions() {
    if (products.length) return;
    const response = await fetch(
      "http://localhost:8080/api/v1/produtos",
      optionsGET,
    );
    products = await response.json();

    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = String(product.id);
      option.textContent = `${product.nome} - R$${formatCurrency(product.preco)}`;
      orderProduct.appendChild(option);
    });
  }

  async function createOrderFromWizard() {
    if (!orderPayment.value) {
      alert("Selecione o método de pagamento.");
      return;
    }

    if (!cartItems.length) {
      alert("Adicione pelo menos um item ao pedido.");
      return;
    }

    await fetch("http://localhost:8080/api/v1/comandas", {
      method: "POST",
    });

    const commandasResponse = await fetch(
      "http://localhost:8080/api/v1/comandas",
      optionsGET,
    );
    const comandas = await commandasResponse.json();
    const lastComanda = comandas.reduce((max, current) => {
      return current.comandaId > max.comandaId ? current : max;
    }, comandas[0]);

    const comandaId = lastComanda?.comandaId;
    if (!comandaId) {
      alert("Não foi possível identificar a nova comanda criada.");
      return;
    }

    for (const item of cartItems) {
      await fetch("http://localhost:8080/api/v1/comandas/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comandaId,
          produtoId: item.produtoId,
          observacao: "",
          quantidade: item.quantidade,
        }),
      });
    }

    await fetch(`http://localhost:8080/api/v1/comandas/${comandaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "PENDENTE",
        metodoDePagamento: orderPayment.value,
      }),
    });

    closeWizard();
    window.loadPage("requests");
  }

  openOrderWizard.addEventListener("click", async () => {
    await fillProductOptions();
    openWizard();
  });

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

  wizardBack.addEventListener("click", () => {
    if (currentStep === 2) {
      showWizardStep(1);
      return;
    }
    closeWizard();
  });

  wizardNext.addEventListener("click", () => {
    if (currentStep === 1) {
      if (!orderType.value) {
        alert("Selecione o tipo de atendimento para continuar.");
        return;
      }
      showWizardStep(2);
      return;
    }

    createOrderFromWizard();
  });

  orderType.addEventListener("change", () => {
    if (orderType.value === "retirada") {
      addressGroup.classList.add("hidden");
      orderCep.value = "57010000";
      orderDistrict.value = "Loja";
      orderStreet.value = "Loja";
      orderNumber.value = "00";
      return;
    }

    addressGroup.classList.remove("hidden");
    orderCep.value = "";
    orderDistrict.value = "";
    orderStreet.value = "";
    orderNumber.value = "";
  });

  orderCep.addEventListener("change", () => {
    const cepValue = orderCep.value;
    if (!cepValue || orderType.value === "retirada") return;

    const url = `https://opencep.com/v1/${cepValue}`;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.onload = function () {
      if (request.status === 200) {
        const endereco = JSON.parse(request.response);
        orderStreet.value = endereco.logradouro || "";
        orderDistrict.value = endereco.bairro || "";
      } else {
        orderStreet.value = "CEP INVÁLIDO";
        orderDistrict.value = "CEP INVÁLIDO";
      }
    };
  });

  addOrderItem.addEventListener("click", () => {
    const productId = Number(orderProduct.value);
    const quantity = Number(orderQuantity.value || 1);

    if (!productId) {
      alert("Selecione um item do cardápio.");
      return;
    }

    if (quantity < 1) {
      alert("A quantidade deve ser maior que zero.");
      return;
    }

    const selectedProduct = products.find(
      (product) => Number(product.id) === productId,
    );
    if (!selectedProduct) return;

    cartItems.push({
      uid: `${Date.now()}-${Math.random()}`,
      produtoId: productId,
      produtoNome: selectedProduct.nome,
      categoria: selectedProduct.categoria,
      quantidade: quantity,
      precoUnitario: Number(selectedProduct.preco),
      image: categoryImage(selectedProduct.categoria, selectedProduct.nome),
    });

    renderCart();
  });

  fetch("http://localhost:8080/api/v1/comandas", optionsGET)
    .then((response) => response.json())
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        const order = data[index];

        const card = document.createElement("article");
        card.className = "grid orderCard";

        const header = document.createElement("header");
        header.className = "orderCardHeader";

        const headerDate = document.createElement("div");
        headerDate.className = "orderHeaderField";
        headerDate.innerHTML = `<span class="orderHeaderLabel">Pedido Realizado</span><strong>${String(
          order.pedidoCriadoEm || "",
        )
          .slice(0, 19)
          .replace("T", " ")}</strong>`;

        const headerTotal = document.createElement("div");
        headerTotal.className = "orderHeaderField";
        headerTotal.innerHTML = `<span class="orderHeaderLabel">Total</span><strong>R$${order.subtotal}</strong>`;

        const headerPayment = document.createElement("div");
        headerPayment.className = "orderHeaderField";
        headerPayment.innerHTML = `<span class="orderHeaderLabel">Pagamento</span><strong>${order.metodoDePagamento}</strong>`;

        const headerCode = document.createElement("div");
        headerCode.className = "orderHeaderField orderHeaderFieldCode";
        headerCode.innerHTML = `<span class="orderHeaderLabel">Pedido Nº</span><strong>${order.codigoDoPedido}</strong>`;

        const expandButton = document.createElement("button");
        expandButton.className = "orderExpandButton";
        expandButton.type = "button";
        expandButton.setAttribute("aria-expanded", "false");
        expandButton.innerHTML = `
          <span class="orderExpandLabel">Ver detalhes</span>
          <span class="orderExpandIcon" aria-hidden="true">▾</span>
        `;

        header.appendChild(headerDate);
        header.appendChild(headerTotal);
        header.appendChild(headerPayment);
        header.appendChild(headerCode);
        header.appendChild(expandButton);

        const body = document.createElement("div");
        body.className = "orderCardBody";

        const itemsPanel = document.createElement("section");
        itemsPanel.className = "orderItemsPanel";

        const itemsTitle = document.createElement("h3");
        itemsTitle.className = "orderItemsTitle";
        itemsTitle.textContent = "Itens do pedido";
        itemsPanel.appendChild(itemsTitle);

        const itemsScroll = document.createElement("div");
        itemsScroll.className = "orderItemsScroll";

        order.items.forEach((item) => {
          const itemRow = document.createElement("div");
          itemRow.className = "orderItemRow";

          const itemImage = document.createElement("img");
          itemImage.className = "orderItemImage";
          itemImage.src = categoryImage(item.categoria, item.produtoNome);
          itemImage.alt = `Imagem do item ${item.produtoNome}`;

          const itemInfo = document.createElement("div");
          itemInfo.className = "orderItemInfo";
          itemInfo.innerHTML = `
            <h4>${item.produtoNome}</h4>
            <p>Categoria: ${item.categoria}</p>
            <p>Valor: R$${item.precoUnitario}</p>
            <p>Quantidade: ${item.quantidade}</p>
          `;

          itemRow.appendChild(itemImage);
          itemRow.appendChild(itemInfo);
          itemsScroll.appendChild(itemRow);
        });

        itemsPanel.appendChild(itemsScroll);

        const actionsPanel = document.createElement("aside");
        actionsPanel.className = "orderActionsPanel";

        const customer = document.createElement("p");
        customer.className = "orderCustomer";
        customer.textContent = "Cliente: Cliente";

        const status = document.createElement("h2");
        status.className = "preparingOrder";
        status.textContent = "Pedido sendo preparado...";

        const actions = document.createElement("div");
        actions.className = "orderPreparingButtonsDiv";

        const orderDoneButton = document.createElement("button");
        orderDoneButton.className = "orderPreparingButtons";
        orderDoneButton.type = "button";
        orderDoneButton.setAttribute(
          "aria-label",
          "Marcar pedido como concluído",
        );
        orderDoneButton.innerHTML = `<img src="../Imgs/icons/checkIcon.svg" alt="Concluir pedido" />`;

        const orderDeleteButton = document.createElement("button");
        orderDeleteButton.className = "orderPreparingButtons";
        orderDeleteButton.type = "button";
        orderDeleteButton.setAttribute("aria-label", "Cancelar pedido");
        orderDeleteButton.innerHTML = `<img src="../Imgs/icons/deleteIcon.svg" alt="Cancelar pedido" />`;

        orderDoneButton.addEventListener("click", () => {
          status.textContent = "Pedido concluído";
          status.classList.add("statusDone");
          actions.remove();
        });

        orderDeleteButton.addEventListener("click", () => {
          status.textContent = "Pedido cancelado";
          status.classList.add("statusCanceled");
          actions.remove();
        });

        actions.appendChild(orderDoneButton);
        actions.appendChild(orderDeleteButton);

        actionsPanel.appendChild(customer);
        actionsPanel.appendChild(status);
        actionsPanel.appendChild(actions);

        body.appendChild(itemsPanel);
        body.appendChild(actionsPanel);

        card.appendChild(header);
        card.appendChild(body);
        card.classList.add("is-collapsed");

        expandButton.addEventListener("click", () => {
          const isCollapsed = card.classList.toggle("is-collapsed");
          const isExpanded = !isCollapsed;
          expandButton.setAttribute("aria-expanded", String(isExpanded));

          const buttonLabel = expandButton.querySelector(".orderExpandLabel");
          if (buttonLabel) {
            buttonLabel.textContent = isExpanded
              ? "Ocultar detalhes"
              : "Ver detalhes";
          }
        });

        gridSection.appendChild(card);
      }
    });
})();
