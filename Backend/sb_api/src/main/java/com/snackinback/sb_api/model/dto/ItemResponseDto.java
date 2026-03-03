package com.snackinback.sb_api.model.dto;

import java.math.BigDecimal;

import com.snackinback.sb_api.model.enums.CategoriasEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponseDto {
    private String produtoNome;
    private CategoriasEnum categoria;
    private Integer quantidade;
    private BigDecimal precoUnitario = BigDecimal.ZERO;

    public BigDecimal getTotalItem() {
        return precoUnitario.multiply(BigDecimal.valueOf(quantidade));
    }
}
