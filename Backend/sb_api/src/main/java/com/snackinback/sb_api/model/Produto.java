package com.snackinback.sb_api.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.snackinback.sb_api.model.enums.CategoriasEnum;

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
@Table(name = "produtos")
@Data
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @OneToMany(mappedBy = "produto", cascade=CascadeType.ALL)
    @JsonIgnore
    @JsonManagedReference
    private List<Item> item;

    String nome;
    BigDecimal preco;
    CategoriasEnum categoria;
}
