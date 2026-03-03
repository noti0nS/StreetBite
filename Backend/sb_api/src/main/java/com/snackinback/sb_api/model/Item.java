package com.snackinback.sb_api.model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "itens")
@Data
@NoArgsConstructor
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    @JsonBackReference
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "comanda_id")
    @JsonBackReference
    private Comanda comanda;
    private Integer quantidade;
    private BigDecimal precoUnitario = BigDecimal.ZERO;

    public void setProduto(Produto produto) {
        this.produto = produto;
        // Definir precoUnitario automaticamente quando o Produto é associado
        if (produto != null) {
            this.precoUnitario = produto.getPreco();
        }
    }
    
    public BigDecimal getTotalItem() {
        return precoUnitario.multiply(BigDecimal.valueOf(quantidade));
    }

    public Item(Produto produto, Comanda comanda, Integer quantidade, BigDecimal precoUnitario) {
        this.produto = produto;
        this.comanda = comanda;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }
}