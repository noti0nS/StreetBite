using NanoidDotNet;
using StreetBite.Api.Abstractions;

namespace StreetBite.Api.Services;

public sealed class NanoIdCodeGeneratorService : IOrderCodeGeneratorService
{
    public string Generate(int size)
        => Nanoid.Generate(Nanoid.Alphabets.NoLookAlikes, size);
}
