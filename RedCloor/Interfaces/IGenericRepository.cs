﻿using RedCloorAPI.Models;
using System.Linq.Expressions;

public interface IGenericRepository<T> where T : class
{
    T GetById(Guid Id);
    IEnumerable<T> GetAll();
    IEnumerable<T> Find(Expression<Func<T, bool>> expression);
    void Add(T entity);
    void AddRange(IEnumerable<T> entities);
    void Remove(T entity);
    void RemoveRange(IEnumerable<T> entities);
}

