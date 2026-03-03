package com.snackinback.sb_api.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
public class Cliente {
    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private Integer telefone;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Endereco> endereco;

    // @OneToMany(mappedBy = "comanda", cascade = CascadeType.ALL)
    // private List <Comanda> comanda;
}
