package com.snackinback.sb_api.model.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.snackinback.sb_api.model.enums.ComandaStatusEnum;
import com.snackinback.sb_api.model.enums.MetodoDePagamentoEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComandaResponseDto {
    private Integer comandaId;
    private List<ItemResponseDto> items;
    private String codigoDoPedido;
    private BigDecimal subtotal;
    private ComandaStatusEnum status;
    private LocalDateTime pedidoCriadoEm;
    private MetodoDePagamentoEnum metodoDePagamento;

    // public ComandaResponseDto(Integer comandaId, 
    //     List<Item> itemsModel, 
    //     String codigoDoPedido, 
    //     Double subtotal, 
    //     ComandaStatusEnum status,
    //     LocalDateTime pedidoCriadoEm, 
    //     MetodoDePagamentoEnum metodoDePagamento) {
            
    //     this.comandaId = comandaId;
    //     this.items = model2Dto(itemsModel);
    //     this.codigoDoPedido = codigoDoPedido;
    //     this.subtotal = subtotal;
    //     this.status = status;
    //     this.pedidoCriadoEm = pedidoCriadoEm;
    //     this.metodoDePagamento = metodoDePagamento;
    // }


    // public List<ItemResponseDto> model2Dto(List<Item> itens){
    //     List<ItemResponseDto> listDto = new ArrayList<>();
    //     for (Item item : itens) {
    //         listDto.add(new ItemResponseDto(
    //             item.getProduto().getNome(),
    //             item.getProduto().getCategoria(),
    //             item.getQuantidade(),
    //             item.getProduto().getPreco()*item.getQuantidade()
    //         ));
    //     }
    //     return listDto;
    // }
}   
