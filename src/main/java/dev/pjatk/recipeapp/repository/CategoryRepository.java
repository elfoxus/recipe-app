package dev.pjatk.recipeapp.repository;

import dev.pjatk.recipeapp.entity.recipe.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByOrderByNameAsc();
}