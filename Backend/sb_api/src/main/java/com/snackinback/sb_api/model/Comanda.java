package com.snackinback.sb_api.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.snackinback.sb_api.model.enums.ComandaStatusEnum;
import com.snackinback.sb_api.model.enums.MetodoDePagamentoEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comandas")
@Data
@NoArgsConstructor
public class Comanda {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "comanda", cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<Item> item;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @Column(unique = true)
    private String codigoDoPedido;
    private ComandaStatusEnum status;
    private BigDecimal subtotal;
    private LocalDateTime pedidoCriadoEm;
    private LocalDateTime update;
    private MetodoDePagamentoEnum metodoDePagamento;
    
    public Comanda(List<Item> item, Cliente cliente, String codigoDoPedido, ComandaStatusEnum status, BigDecimal subtotal,
            LocalDateTime pedidoCriadoEm, LocalDateTime update, MetodoDePagamentoEnum metodoDePagamento) {
        this.item = item;
        this.cliente = cliente;
        this.codigoDoPedido = codigoDoPedido;
        this.status = status;
        this.subtotal = subtotal;
        this.pedidoCriadoEm = pedidoCriadoEm;
        this.update = update;
        this.metodoDePagamento = metodoDePagamento;
    }
}
