namespace StreetBite.Api.Abstractions;

public interface IOrderCodeGeneratorService
{
    string Generate(int size);
}
