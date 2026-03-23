 package com.streetbite.streetbite_api;

import java.math.BigDecimal;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.streetbite.streetbite_api.model.Produto;
import com.streetbite.streetbite_api.model.enums.CategoriasEnum;
import com.streetbite.streetbite_api.repository.ProdutoRepository;

@SpringBootApplication
public class StreetBiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(StreetBiteApplication.class, args);
	}

	@Bean
	CommandLineRunner seedProdutos(ProdutoRepository produtoRepository) {
		return args -> {
			seedProduto(produtoRepository, "Big SB", new BigDecimal("20.00"), CategoriasEnum.LANCHE);
			seedProduto(produtoRepository, "Big SB Bacon", new BigDecimal("23.00"), CategoriasEnum.LANCHE);
			seedProduto(produtoRepository, "Big SB Cheddar", new BigDecimal("25.00"), CategoriasEnum.LANCHE);
			seedProduto(produtoRepository, "Classic SB", new BigDecimal("12.00"), CategoriasEnum.LANCHE);
		};
	}

	private void seedProduto(ProdutoRepository produtoRepository, String nome, BigDecimal preco, CategoriasEnum categoria) {
		if (produtoRepository.existsByNome(nome)) {
			return;
		}

		Produto produto = new Produto();
		produto.setNome(nome);
		produto.setPreco(preco);
		produto.setCategoria(categoria);
		produtoRepository.save(produto);
	}

}
