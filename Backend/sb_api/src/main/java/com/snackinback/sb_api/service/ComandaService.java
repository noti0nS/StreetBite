package com.snackinback.sb_api.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.snackinback.sb_api.model.Comanda;
import com.snackinback.sb_api.model.Item;
import com.snackinback.sb_api.model.Produto;
import com.snackinback.sb_api.model.dto.ComandaResponseDto;
import com.snackinback.sb_api.model.dto.ComandaStatusRequestDto;
import com.snackinback.sb_api.model.dto.ItemRequestDto;
import com.snackinback.sb_api.model.dto.ItemResponseDto;
import com.snackinback.sb_api.model.dto.ItemUpdateRequestDto;
import com.snackinback.sb_api.model.enums.ComandaStatusEnum;
import com.snackinback.sb_api.model.enums.MetodoDePagamentoEnum;
import com.snackinback.sb_api.repository.ComandaRepository;
import com.snackinback.sb_api.repository.ItemRepository;
import com.snackinback.sb_api.repository.ProdutoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComandaService {
    private static Logger logger = LoggerFactory.getLogger(ComandaService.class);
    private final ComandaRepository comandaRepository;
    private final ItemRepository itemRepository;
    private final ProdutoRepository produtoRepository;

    // SERVIÇOS DA COMANDA
    @SuppressWarnings("deprecation")
    public void addComanda(){
        String nPedido = RandomStringUtils.randomAlphanumeric(4).toUpperCase();
        Comanda comanda = comandaRepository
            .findByCodigoDoPedido(nPedido)
            .orElse(new Comanda(
                new ArrayList<>(),
                null,
                nPedido,
                ComandaStatusEnum.PENDENTE,
                BigDecimal.ZERO,
                LocalDateTime.now(),
                LocalDateTime.now(),
                MetodoDePagamentoEnum.PIX
            ));

        comandaRepository.save(comanda);
        // return new ComandaResponseDto(
        //     comanda.getId(),
        //     comanda.getItem(),
        //     nPedido,
        //     comanda.getSubtotal(),
        //     comanda.getStatus(),
        //     comanda.getPedidoCriadoEm(),
        //     comanda.getMetodoDePagamento());
        
    }

    public ComandaResponseDto getComandaById(Long id){
        
        if (id==null) throw new RuntimeException("ID inválido.");
        Comanda comanda = comandaRepository.findById(id)
         .orElseThrow(
                () -> new RuntimeException("Comanda não encontrada.")
                );
                
        BigDecimal subtotal = calcularSubtotal(comanda);
        comanda.setSubtotal(subtotal);  // Atualiza o subtotal
        
        List<ItemResponseDto> itensDto = comanda.getItem()
            .stream()
            .map(item -> new ItemResponseDto(
                                                item.getProduto().getNome(), 
                                                item.getProduto().getCategoria(),  
                                                item.getQuantidade(), 
                                                item.getPrecoUnitario()))
            .collect(Collectors.toList());
        
        return new ComandaResponseDto(
                                         comanda.getId(),
                                         itensDto,
                                         comanda.getCodigoDoPedido(),
                                         subtotal,
                                         comanda.getStatus(),
                                         comanda.getPedidoCriadoEm(),
                                         comanda.getMetodoDePagamento()      
                                    );
                
    }

    public List<ComandaResponseDto> listarTodasAsComandas(){
        List<Comanda> comandas = comandaRepository.findAll();

        List<ComandaResponseDto> response = new ArrayList<>();
        ComandaResponseDto itemComanda;
        ItemResponseDto item = new ItemResponseDto();

        for (Comanda comanda : comandas) {
            itemComanda = new ComandaResponseDto();
            itemComanda.setComandaId(comanda.getId());
            itemComanda.setCodigoDoPedido(comanda.getCodigoDoPedido());
            itemComanda.setPedidoCriadoEm(comanda.getPedidoCriadoEm());
            itemComanda.setStatus(comanda.getStatus());
            itemComanda.setMetodoDePagamento(comanda.getMetodoDePagamento());

            BigDecimal cont = BigDecimal.ZERO;

            List<ItemResponseDto> responseItem = new ArrayList<>();
            
            for (Item i : comanda.getItem()) {
                item = new ItemResponseDto();
                item.setProdutoNome(i.getProduto().getNome());
                item.setCategoria(i.getProduto().getCategoria());
                item.setQuantidade(i.getQuantidade());
                item.setPrecoUnitario(i.getPrecoUnitario());
                cont = cont.add(i.getTotalItem());
                responseItem.add(item);
            }
            
            itemComanda.setSubtotal(cont);
            itemComanda.setItems(responseItem);
            response.add(itemComanda);
        }
        return response;
    }

    public void updateComanda(Long id, ComandaResponseDto update){
        if(id == null)throw new RuntimeException("ID inválido.");
        
            Comanda comanda = comandaRepository.findById(id)
                    .orElseThrow(
                            () -> new RuntimeException("Comanda não encontrada.")
                        );

            comanda.setStatus(update.getStatus());
            comanda.setMetodoDePagamento(update.getMetodoDePagamento());
            
            comandaRepository.save(comanda);

    }

    public void updateStatusComanda(Long id, ComandaStatusRequestDto update){
        if(id == null)throw new RuntimeException("ID inválido.");
        
            Comanda comanda = comandaRepository.findById(id)
                    .orElseThrow(
                            () -> new RuntimeException("Comanda não encontrada.")
                        );
            comanda.setStatus(ComandaStatusEnum.PENDENTE);
            comanda.setStatus(update.getStatus());
    }

    public void deleteComanda(Long id){
        if(id == null)throw new RuntimeException("ID inválido.");
        comandaRepository.deleteById(id);
    }

    // SERVIÇOS DE ITEM
    public void addItem(ItemRequestDto request){
        logger.info(Long.toString(request.getComandaId()));
        Produto produto = produtoRepository.findById(request.getProdutoId()).orElseThrow(() -> new RuntimeException("erro"));
        Comanda comanda = comandaRepository.findById(request.getComandaId()).orElseThrow(() -> new RuntimeException("erro"));
        Item item = new Item();
        item.setComanda(comanda);
        item.setProduto(produto);
        item.setQuantidade(request.getQuantidade());
        item = itemRepository.save(item);
        logger.info(Integer.toString(item.getId()));
        comanda.getItem().add(itemRepository.findById(Long.parseLong(Integer.toString(item.getId()))).get());
        comandaRepository.save(comanda);
    }

    public ItemResponseDto getItemById(Long id){
        
        if (id==null) throw new RuntimeException("ID inválido.");
        Item item = itemRepository.findById(id)
         .orElseThrow(
                () -> new RuntimeException("Item não encontrado.")
                );

        return new ItemResponseDto(
                                    item.getProduto().getNome(), 
                                    item.getProduto().getCategoria(), 
                                    item.getQuantidade(), 
                                    item.getPrecoUnitario()
                                );
                
    }
    
    public List<ItemResponseDto> listarTodosOsItens(){
        // Supondo que você tenha um repositório para buscar todos os itens
    List<Item> itens = itemRepository.findAll();  // Buscar todos os itens no banco de dados

    // Criar uma lista para armazenar os DTOs
    List<ItemResponseDto> itemResponseDtos = new ArrayList<>();

    // Iterar sobre os itens e mapear para ItemResponseDto
    for (Item item : itens) {
        ItemResponseDto itemResponseDto = new ItemResponseDto(
            item.getProduto().getNome(),
            item.getProduto().getCategoria(),
            item.getQuantidade(),
            item.getPrecoUnitario()
        );
        
        // Adicionar o ItemResponseDto à lista
        itemResponseDtos.add(itemResponseDto);
    }

    return itemResponseDtos;  // Retornar a lista de ItemResponseDto
    }

    public void updateItem(Long id, ItemUpdateRequestDto update){
        if(id == null)throw new RuntimeException("ID inválido");
        
            Item item = itemRepository.findById(id)
                    .orElseThrow(
                            () -> new RuntimeException("Item não encontrado.")
                        );
            item.setQuantidade(update.getQuantidade());
            
            itemRepository.save(item);

    }

    public void deleteItem(Long id){
        if(id == null)throw new RuntimeException("ID inválido");
        itemRepository.deleteById(id);
    }
    
    // MÉTODOS
    private BigDecimal calcularSubtotal(Comanda comanda) {
       // Utiliza stream para somar o totalItem de cada Item
    return comanda.getItem().stream()
        .map(Item::getTotalItem)  // Pega o valor de totalItem de cada Item
        .filter(Objects::nonNull)  // Garante que não estamos somando valores nulos
        .reduce(BigDecimal.ZERO, BigDecimal::add);  // Soma todos os valores
    }
    
}


