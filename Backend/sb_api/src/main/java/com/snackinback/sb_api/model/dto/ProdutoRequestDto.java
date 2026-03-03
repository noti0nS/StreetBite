package com.snackinback.sb_api.model.dto;

import com.snackinback.sb_api.model.enums.CategoriasEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoRequestDto {
        
    private String nome;
    private Double preco;
    private CategoriasEnum categoria;
    
}
